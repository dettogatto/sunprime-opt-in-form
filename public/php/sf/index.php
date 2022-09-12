<?php

require __DIR__ . '/api/sf-api.php';
$sf = new Salesforce_Api_Gatto();


if($sf->connect()){ // API connected

  if($_SERVER["REQUEST_METHOD"] == "POST"){ // Send data

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
    $response = NULL;

    if(isset($data["contact"])){
      $response = $sf->syncLead($data["contact"]);

      $log = '###### TIME ######' . PHP_EOL . PHP_EOL;
      $log .= date("Y-m-d H:i:s") . PHP_EOL . PHP_EOL;
      $log .= '###### SENT ######' . PHP_EOL . PHP_EOL;
      $log .= var_export($data, true) . PHP_EOL . PHP_EOL;
      $log .= '###### RECEIVED ######' . PHP_EOL . PHP_EOL;
      $log .= var_export($response, true) . PHP_EOL . PHP_EOL;
      $log .= '----------------------------' . PHP_EOL . PHP_EOL;

      file_put_contents('./log-'.date('Y-m-d').'.txt', $log, FILE_APPEND);
    }

    $return_data = array(
      'id' => '',
      'error' => '',
      'double_check' => $dc
    );

    if($response && $response['success']){ // Success!
      $return_data['id'] = $response['id'];
      $dc = $sf->getLeadById($response['id']);
      $dc = (is_array($dc) && count($dc) > 1);
      $return_data['double_check'] = $dc;
    } else { // Fail
      if($response === NULL){
        $return_data['error'] = "Lead was already present";
      } else {
        if($response && $response[0] && $response[0]['message']){
          $return_data['error'] = $response[0]['message'];
        }
      }
    }

    echo(json_encode($return_data));


  } elseif(isset($_GET["tetto"])){ // Get roof path from SF
    echo($sf->getLeadById($_GET["tetto"])["Punti_Tetto__c"]);
  } elseif(isset($_GET["info"])){ // Print info
    printInfo();
  } else { // Do nothing
    echo("Salesforce is connected");
  }

} else { // API not connected

  if($sf->clientMustBeFilled()) {

    printClientFillInstructions();

  } else if(isset($_GET["code"]) && $_GET["code"]) { // Get Refresh Tk from Code

    $success = $sf->getRefreshTokenFromGrantCode($_GET["code"]);
    if($success) {
      echo('Refresh token aquired!');
    } else {
      echo('Something went wrong getting the refresh token');
    }
  } else {
    $link = $sf->getLoginLink();
    echo('Authorize <a href="' . $link . '">here</a>');
  }
}





function printInfo() {
  global $sf;
  echo("<h2>Salesforce</h2>");
  echo('<pre style="line-height: 1.4em;">');
  echo("Leads Fields and CustomFields:\n\n");
  $fields = $sf->listLeadFields();
  if(is_array($fields)){
    foreach($sf->listLeadFields() as $k => $v){
      echo("  - ".$v."\n");
    }
  }
  echo('</pre>');
}


function printClientFillInstructions() {
  global $sf;
  ?>
  <pre>
    # Setup

    Go to:
    Salesforce Settings page -> Apps -> App Manager -> New Connected App

    Enable OAuth Settings

    Scopes:
    - Access and manage your data (api)
    - Perform requests on your behalf at any time (refresh_token, offline_access)

    Callback url:
    <?php echo($sf->getRedirectUri()); ?>
  </pre>
  <?php
}
