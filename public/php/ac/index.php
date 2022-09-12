<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 'On');
require_once('./activecampaign-api-v3.php');

$ac = new ActiveCampaign_API_Gatto();

if($_SERVER["REQUEST_METHOD"] == "POST"){

  // send array with axios in the form:
  //
  //   {
  //     contact: { email, firstName, lastName, ... },
  //     tags: [1, 2, 3, ...],
  //     fields: {
  //       field1: val1,
  //       field2: val2
  //     }
  //   }


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $contact_id = 0;

  if(isset($data["contact"]) && isset($data["contact"]["email"])){
    $contact = $ac->sync_contact($data["contact"]);
    $contact_id = $contact['id'];

    if($contact_id){

      if(is_array($data["tags"])){
        foreach($data["tags"] as $tag_id){
          $ac->add_tag_to_contact($contact_id, $tag_id);
        }
      }

      if(is_array($data["fields"])){
        foreach($data["fields"] as $field_id => $field_value){
          $ac->update_contact_field($contact_id, $field_id, $field_value);
        }
      }

      if(is_array($data["lists"])){
        foreach($data["lists"] as $list_id){
          $ac->subscribe_contact_to_list($contact_id, $list_id);
        }
      }

    }
  } else {
    echo("I need email");
  }

} else {
  if($ac->check_connection()){
    if(isset($_GET["info"]) || isset($_GET["tag"]) || isset($_GET["tags"])){
      echo("<h2>" . $ac->get_account_name() . "</h2>");
      echo('<pre style="line-height: 1.4em;">');
      echo("Tags:\n\n");
      $any = false;
      foreach($ac->get_all_tags() as $k => $v){
        $any = true;
        echo(str_repeat(" ", 4 - strlen($k)) . $k . "  ---  ". $v . "\n");
      }
      if(!$any){echo("  NONE");}

      echo("\n\nCustom fields:\n\n");
      $any = false;
      foreach($ac->get_all_fields() as $k => $v){
        $any = true;
        echo(str_repeat(" ", 4 - strlen($k)) . $k . "  ---  ". $v);
        echo("\n");
      }
      if(!$any){echo("  NONE");}

      echo("\n\nLists:\n\n");
      $any = false;
      foreach($ac->get_all_lists() as $k => $v){
        $any = true;
        echo(str_repeat(" ", 4 - strlen($k)) . $k . "  ---  ". $v);
        echo("\n");
      }
      if(!$any){echo("  NONE");}

      echo("</pre>");
    } else {
      echo($ac->get_account_name()."'s ActiveCampaign is connected.");
    }
  } else {
    echo("Something is wrong. Check api credentials.");
  }
}
