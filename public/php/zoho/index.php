<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 'On');
require_once('./zoho-connection.php');
$zoho = new Zoho_Connection_By_Gatto();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $response = "";

    if(isset($data->contact)){
        $response = $zoho->sync_contact($data->contact);
        sleep(2);
        if($response && $response->getData()[0]){
            $id = $response->getData()[0]->getEntityId();
            $zoho->set_contact_field_value($id, "Website", "https://sunprime.it/traccia-il-tuo-tetto/tracciato?id=".$id);
        }
    }


} else if(isset($_GET["code"])){
    $zoho->get_tokens_from_grant($_GET["code"]);
} elseif( !$zoho->check_connection() ) {
    if($zoho->get_activation_link()){
        echo("Activate here:<br><br>");
        echo('<a href="'.$zoho->get_activation_link().'">'.$zoho->get_activation_link().'</a>');
    } else {
        ?>
        Go to <a href="https://accounts.zoho.eu/developerconsole">https://accounts.zoho.eu/developerconsole</a>
        <br><br>
        Create new client with:<br>
        Domain: <?php echo($_SERVER['HTTP_HOST']); ?><br>
        Redirect URI: <?php echo($zoho->get_redirect_uri()); ?>
        <br><br>
        Edit zoho-connection.php with client data.
        <?php
    }
} elseif(isset($_GET["tetto"])){
    echo($zoho->get_contact_field_value($_GET["tetto"], "Description"));
} else {
    echo("Zoho is connected");
}
