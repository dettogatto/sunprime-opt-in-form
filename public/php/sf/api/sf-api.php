<?php

class Salesforce_Api_Gatto {

  private $clientId = 'your-client-id';
  private $clientSecret = 'your-client-secret';

  private $tokensDir = __DIR__ . '/tokens/';
  private $instanceUri;
  private $accessToken;


  function __construct(){

  }

  function clientMustBeFilled(){
    return !$this->clientId || strlen($this->clientId) < 3 || !$this->clientSecret || strlen($this->clientSecret) < 3;
  }

  function syncLead($data){
    $url = "/services/data/v39.0/sobjects/Lead/UniqueEmail__c/" . $data["Email"];
    $r = $this->curl($url, $data, "PATCH");
    return $r;
  }

  function getLeadByEmail($email){
    $url = "/services/data/v39.0/sobjects/Lead/UniqueEmail__c/" . $email;
    $r = $this->curl($url, null, "GET");
    return $r;
  }

  function getLeadById($id){
    $url = "/services/data/v39.0/sobjects/Lead/" . $id;
    $r = $this->curl($url, null, "GET");
    return $r;
  }

  function listLeadFields(){
    $url = "/services/data/v39.0/sobjects/Lead/describe";
    $r = $this->curl($url, NULL, "GET");
    $fields = array();
    if(!isset($r["fields"])){
      if(isset($r[0]["errorCode"])){
        return ["error", $r[0]["errorCode"], $r[0]["message"]];
      }
      return null;
    }
    foreach ($r["fields"] as $k => $v) {
      $fields[] = $v["name"];
    }
    // $this->deb("listLeadFields", $fields);
    return $fields;
  }

  function connect(){
    $ref = $this->getTokenFromFile('refresh');
    if(!$ref || $ref == ""){
      return false;
    }
    if($this->accessToken && strlen($this->accessToken) > 3){
      return true;
    }
    return $this->refreshAccessToken();
  }

  function getRefreshTokenFromGrantCode($code){
    $url = 'https://login.salesforce.com/services/oauth2/token';
    $body = array(
      'grant_type' => 'authorization_code',
      'client_id' => $this->clientId,
      'client_secret' => $this->clientSecret,
      'redirect_uri' => $this->getRedirectUri(),
      'code' => $code
    );
    $response = $this->curlSetup($url, $body);

    // $this->deb('getRefreshTokenFromGrantCode', $response);

    if(isset($response['refresh_token']) && $response['refresh_token']){
      $this->saveTokenToFile('refresh', $response['refresh_token']);
      return true;
    }
    return false;
  }

  function refreshAccessToken(){
    $url = 'https://login.salesforce.com/services/oauth2/token';
    $body = array(
      'grant_type' => 'refresh_token',
      'refresh_token' => $this->getTokenFromFile('refresh'),
      'client_id' => $this->clientId,
    );
    $response = $this->curlSetup($url, $body);

    // $this->deb('refreshAccessToken', $response);

    if(isset($response['instance_url']) && $response['instance_url'] && isset($response['access_token']) && $response['access_token']){
      $this->instanceUri = $response['instance_url'];
      $this->accessToken = $response['access_token'];
      return true;
    }
    return false;
  }


  function getLoginLink(){
    $link = 'https://login.salesforce.com/services/oauth2/authorize';
    $link .= '?prompt=login%20consent';
    $link .= '&response_type=code';
    $link .= '&client_id=' . urlencode($this->clientId);
    $link .= '&redirect_uri=' . urlencode($this->getRedirectUri());
    $link .= '&login_hint=' . urlencode('nicola.cavallazzi@gmail.com');
    $link .= '&state=';
    return $link;
  }


  private function curlSetup($url, $body){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    $server_output = curl_exec($ch);
    $response = json_decode($server_output, true);

    $log = '###### SETUP SERVER OUTPUT ######' . PHP_EOL . PHP_EOL;
    $log .= $server_output . PHP_EOL . PHP_EOL;
    $log .= '###### SETUP RESPONSE ######' . PHP_EOL . PHP_EOL;
    $log .= var_export($response, true) . PHP_EOL . PHP_EOL;
    file_put_contents('./curl-log-'.date('Y-m-d').'.txt', $log, FILE_APPEND);

    return $response;
  }

  private function curl($url, $body, $method = "POST") {
    $url = $this->instanceUri . $url;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer ' . $this->accessToken));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 50);
    curl_setopt($ch, CURLOPT_TIMEOUT, 50);

    $httpCode = curl_getinfo($ch , CURLINFO_HTTP_CODE); // this results 0 every time
    $server_output = curl_exec($ch);
    $httpCode2 = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    $response = json_decode($server_output, true);

    $log = '###### DETAILS ######' . PHP_EOL . PHP_EOL;
    $log .= 'Url: ' . $url . PHP_EOL . PHP_EOL;
    $log .= 'Body JSON Encoded: ' . json_encode($body) . PHP_EOL . PHP_EOL;
    $log .= 'Body VAR Export: ' . var_export($body, true) . PHP_EOL . PHP_EOL;
    $log .= 'Method: ' . $method . PHP_EOL . PHP_EOL;
    $log .= 'Access Token: ' . $this->accessToken . PHP_EOL . PHP_EOL;
    $log .= '###### CURL INFO ######' . PHP_EOL . PHP_EOL;
    $log .= 'HTTP Code before: ' . $httpCode . PHP_EOL . PHP_EOL;
    $log .= '###### SERVER OUTPUT ######' . PHP_EOL . PHP_EOL;
    $log .= 'HTTP Code after: ' . $httpCode2 . PHP_EOL . PHP_EOL;
    $log .= $server_output . PHP_EOL . PHP_EOL;
    if ($server_output === false) {
      $log .= 'cURL Error: ' . curl_error($ch) . PHP_EOL . PHP_EOL;
      $log .= 'cURL Error number' . curl_errno($ch) . PHP_EOL . PHP_EOL;
    }
    $log .= '###### RESPONSE ######' . PHP_EOL . PHP_EOL;
    $log .= var_export($response, true) . PHP_EOL . PHP_EOL;
    file_put_contents('./curl-log-'.date('Y-m-d').'.txt', $log, FILE_APPEND);

    return $response;
  }

  private function saveTokenToFile($name, $token){
    $myfile = fopen($this->tokensDir . $name . '.php', "w");
    $txt = "<?php\n";
    $txt .= 'return "' . $token . '";';
    fwrite($myfile, $txt);
    fclose($myfile);
  }

  private function getTokenFromFile($name){
    $file = $this->tokensDir . $name . '.php';
    if(!file_exists($file)){ return false; }
    return require($file);
  }

  private function deb($title, $body){
    echo('<pre>');
    echo($title);
    echo("\n\n");
    var_dump($body);
    echo('</pre>');
  }

  public function getRedirectUri(){
    $link = (
      (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") .
      "://" . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']
    );
    $link = preg_replace('/index\.php$/', '', $link);
    return $link;
  }

}
