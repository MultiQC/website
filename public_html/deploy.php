<?php
if ( $_POST['payload'] ) {
  
  // Get the hook secret
  $config = parse_ini_file("../config.ini");
  
  // Check that the hashed signature looks right
  list($algo, $hash) = explode('=', $_SERVER['HTTP_X_HUB_SIGNATURE'], 2) + array('', '');
  $rawPost = file_get_contents('php://input');
  if ($hash !== hash_hmac($algo, $rawPost, $config['secret'])){
    die('GitHub signature looks wrong.');
  }
  
  // Pull the new version of the repo
  shell_exec("cd /home/multiqc/multiqc && /usr/local/cpanel/3rdparty/bin/git pull");
  shell_exec("php /home/multiqc/scrape_pypi_downloads.php > /dev/null");
  die("done " . mktime());
}
?>