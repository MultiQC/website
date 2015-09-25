<?php
error_reporting(E_ALL);

// Figure out what page we're loading
// eg. $_SERVER['REQUEST_URI'] = /docs/0.2/javascript or /docs/0.2/
$uri = trim($_SERVER['REQUEST_URI'], '/');
$parts = explode('/', $uri);
$docs_version = isset($parts[1]) ? $parts[1] : false;
if(isset($parts[2])){
  $name = $parts[2];
} else {
  $name = 'index';
}
$name = trim($name, '.md');
$dots = str_repeat('../', count(explode('/', $_SERVER['REQUEST_URI']))-2);

// Get the source file
$source = "../../multiqc/$docs_version/docs/$name.md";
if(!file_exists($source)){
  $source = "404.md";
  if(!file_exists("../../multiqc/$docs_version/")){
    $docs_version = '??';
  }
}

// Set up some basic config
$docs_pages = [];
foreach (glob("../../multiqc/$docs_version/docs/*.md") as $file) {
  $pname = substr(basename($file), 0, -3);
  $nname = $pname;
  if($pname == 'README'){ continue; }
  if($pname == 'index'){ $nname = 'Home'; }
  else {$pc = file_get_contents($file);
    if(preg_match('/title: (.*)/', $pc, $matches)){
      $nname = $matches[1];
    }
  }
  $docs_pages[$pname] = $nname;
}
$page = array('version' => $docs_version, 'nav' => $docs_pages);

// Get markdown and parse YAML
// (parse YAML manually as not a core PHP package.. sigh.)
$md = file_get_contents($source);
$md_parts = explode('---', $md, 3);
if(count($md_parts) == 3){
    $md = $md_parts[2];
    foreach(preg_split('/$\R?^/m', $md_parts[1]) as $l){
        $l_parts = explode(":", $l, 2);
        if(isset($l_parts[1])){
            $page[trim($l_parts[0])] = trim($l_parts[1]);
        }
    }
}

////// PRINT PAGE

// Header
require_once('header.php');

// Parse markdown and print
require_once('parsedown/Parsedown.php');
require_once('parsedown-extra/ParsedownExtra.php');
$pd = new ParsedownExtra();
echo $pd->text($md);

// Footer
require_once('footer.php');

