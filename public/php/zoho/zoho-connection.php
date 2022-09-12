<?php

require_once( __DIR__ . '/vendor/autoload.php' );
use zcrmsdk\crm\setup\restclient\ZCRMRestClient;
use zcrmsdk\oauth\ZohoOAuth;
use zcrmsdk\crm\crud\ZCRMRecord;

class Zoho_Connection_By_Gatto {

    private $ZOHOconfigarray;
    private $ZOHOuseremail;
    private $connectionStatus;

    function __construct(){
        $this->ZOHOuseremail = "sunprime.mirai@gmail.com";
        $this->ZOHOconfigarray = array(
            "client_id" => "your-client-id",
            "client_secret" => "your-client-secret",
            "redirect_uri" => $this->get_redirect_uri(),
            "currentUserEmail" => $this->ZOHOuseremail,
            "token_persistence_path" => __DIR__ . '/tokens'
        );
        try{
            ZCRMRestClient::initialize($this->ZOHOconfigarray);
        } catch(Exception $e){
            return false;
        }
    }


    public function check_connection(){
        if($this->connectionStatus == "ko"){
            return false;
        } elseif($this->connectionStatus == "ok"){
            return true;
        }
        $rest=ZCRMRestClient::getInstance();//to get the rest client
        try{
            $orgIns=$rest->getOrganizationDetails()->getData();
        } catch (Exception $e) {
            $this->connectionStatus = "ko";
            return false;
        }
        $this->connectionStatus = "ok";
        return true;
    }

    public function get_tokens_from_grant($grant_token){
        $url = "https://accounts.zoho.eu/oauth/v2/token";
        $body = array(
            'grant_type' => 'authorization_code',
            'client_id' => $this->ZOHOconfigarray["client_id"],
            'client_secret' => $this->ZOHOconfigarray["client_secret"],
            'redirect_uri' => $this->get_redirect_uri(),
            'code' => $grant_token
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));

        $server_output = curl_exec($ch);
        curl_close ($ch);
        $response = json_decode($server_output);
        if($response && isset($response->refresh_token)){
            $oAuthClient = ZohoOAuth::getClientInstance();
            $userIdentifier = $this->ZOHOuseremail;
            $oAuthTokens = $oAuthClient->generateAccessTokenFromRefreshToken($response->refresh_token, $userIdentifier);
            echo("Got the tokens! Good to go!");
            return true;
        } elseif($response && isset($response->error)){
            echo("Zoho returned the error \"".$response->error."\". Try to go back to the Elementor-Zoho settings page and click the link again.");
            echo('<br><br>');
            echo('<a href="'.$this->get_activation_link().'">'.$this->get_activation_link().'</a>');
            echo('<br><br>');
            var_dump($response);
            return false;
        } else {
            echo("Refresh token not found in response. Try deleting the client and starting from scratch.");
            echo('<br><br>');
            var_dump($response);
            return false;
        }
    }

    public function list_module_fields($module = "Leads"){
        // $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads");
        // //$response = $moduleIns->getAllFields();
        // var_dump($moduleIns);
        // //$fields = $response->getData();

        $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads"); // To get module instance
        $response = $moduleIns->getAllFields();
        //$fields = $response->getData();
        var_dump($response);

    }

    public function sync_contact($field_values){
        $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads"); // To get module instance
        $records = array();
        $record=ZCRMRecord::getInstance("Leads", null);  //To get ZCRMRecord instance
        //$record->setFieldValue("Email",$email);
        foreach($field_values as $k => $v){
            $record->setFieldValue($k, $v);
        }
        array_push($records, $record); // pushing the record to the array.
        $responseIn = $moduleIns->upsertRecords($records, array(), NULL); // updating the records.$trigger,$lar_id are optional
        return $responseIn;
    }

    public function get_contact($contact_id){
        $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads"); // To get module instance
        $response = $moduleIns->getRecord($contact_id);
        $record = $response->getData();
        return $record;
    }

    public function get_contact_field_value($contact_id, $field_name){
        $record = $this->get_contact($contact_id);
        return $record->getFieldValue($field_name);
    }

    public function set_contact_field_value($contact_id, $field_name, $field_value){
        $moduleIns = ZCRMRestClient::getInstance()->getModuleInstance("Leads"); // To get module instance
        $record = ZCRMRecord::getInstance("Leads", $contact_id);
        $record->setFieldValue($field_name, $field_value);
        $responseIn = $moduleIns->upsertRecords(array($record),null,null); // updating the records.
        return $responseIn;
    }

    public function get_redirect_uri(){
        $link = (
            (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") .
            "://" . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']
        );
        return $link;

    }

    public function get_activation_link(){
        if($this->ZOHOconfigarray["client_id"] && $this->ZOHOconfigarray["client_secret"] && $this->ZOHOuseremail){
            return 'https://accounts.zoho.eu/oauth/v2/auth?scope=ZohoCRM.users.ALL,ZohoCRM.modules.ALL,ZohoCRM.org.ALL,ZohoCRM.bulk.ALL&client_id='.$this->ZOHOconfigarray["client_id"].'&response_type=code&access_type=offline&redirect_uri='.$this->get_redirect_uri();
        }
        return null;
    }

}
