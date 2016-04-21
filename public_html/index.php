<?php 

// Parse the list of modules from the docs folder
require_once("../Spyc.php");
$md = file_get_contents('../multiqc/docs/README.md');
$md_parts = explode('---', $md, 3);
$modules = [];
if(count($md_parts) == 3){
  $pages = spyc_load($md_parts[1]);
  if(isset($pages['MultiQC Modules'])){
    foreach($pages['MultiQC Modules'] as $sect_name => $sect){
      foreach($sect as $fn){
        $mod_md = file_get_contents('../multiqc/docs/'.trim($fn));
        $mod_md_parts = explode('---', $mod_md, 3);
        if(count($mod_md_parts) == 3){
          $yaml = spyc_load($mod_md_parts[1]);
          $yaml['docs_url'] = 'docs/#'.strtolower(str_replace(' ', '-', $yaml['Name']));
          $yaml['section'] = $sect_name;
          $modules[] = $yaml;
        }
      }
    }
  }
}


?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>MultiQC</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="fonts/font-mfizz.css">
    <link rel="stylesheet" href="css/styles.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body id="mqc_homepage">

    <div class="header">
      
      <!-- Static navbar -->
      <nav class="navbar navbar-default navbar-inverse navbar-static-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand visible-xs" href="#">MultiQC</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <p class="navbar-text hidden-xs hidden-sm"><a href="https://github.com/ewels/MultiQC/releases" class="navbar-link">Current version: v0.5</a></p>
              <li class="active"><a href="#">Home</a></li>
              <li><a href="docs/">Docs</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Example Reports <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li class="dropdown-header">Analysis Types</li>
                  <li><a href="examples/rna-seq/multiqc_report.html">RNA-Seq</a></li>
                  <li><a href="examples/wgs/multiqc_report.html">Whole Genome</a></li>
                  <li><a href="examples/bs-seq/multiqc_report.html">Bisulfite</a></li>
                  <li><a href="examples/hi-c/multiqc_report.html">Hi-C</a></li>
                </ul>
              </li>
              <li><a href="https://www.github.com/ewels/MultiQC">GitHub</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </nav>
      
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <h1>
              <object type="image/svg+xml" title="MultiQC" data="images/MultiQC_logo.svg">
						    <img src="images/MultiQC_logo.png">
					    </object>
            </h1>
            <p class="lead">Aggregate results from bioinformatics analyses across many samples into a single report</p>
            <p>MultiQC searches a given directory for analysis logs and compiles a HTML report.
              It's a general use tool, perfect for summarising the output from numerous bioinformatics tools.</p>
            
            <div class="row videos-row">
              <div class="col-md-6">
                <div class="embed-responsive embed-responsive-16by9 homepage-header-video hidden-xs hidden-sm">
                  <iframe id="multiqc-video" class="embed-responsive-item" src="https://www.youtube.com/embed/BbScv9TcaMg?rel=0&amp;showinfo=0" allowfullscreen></iframe>
                </div>
              </div>
              <div class="col-md-6">
                <ul class="list-switch left video-chooser">
                  <li><a href="https://youtu.be/BbScv9TcaMg" data-src="https://www.youtube.com/embed/BbScv9TcaMg?rel=0&amp;showinfo=0" class="active"><span class="hidden-lg hidden-md label label-default">Video</span> Introduction to MultiQC <em>(1:19)</em></a></li>
                  <li><a href="https://youtu.be/IvUU8joBb1Q" data-src="https://www.youtube.com/embed/IvUU8joBb1Q?rel=0&amp;showinfo=0"><span class="hidden-lg hidden-md label label-default">Video</span> Installing MultiQC <em>(1:19)</em></a></li>
                  <li><a href="https://youtu.be/VMSucLLmPwU" data-src="https://www.youtube.com/embed/VMSucLLmPwU?rel=0&amp;showinfo=0"><span class="hidden-lg hidden-md label label-default">Video</span> Using MultiQC <em>(1:19)</em></a></li>
                  <li><a href="https://youtu.be/tU1b1H2EWU4" data-src="https://www.youtube.com/embed/tU1b1H2EWU4?rel=0&amp;showinfo=0"><span class="hidden-lg hidden-md label label-default">Video</span> MultiQC Reports <em>(1:19)</em></a></li>
                </ul>
              </div>
            </div>
            
          </div>
          <div class="col-md-4" id="header-buttons">
            <a class="btn btn-block btn-lg btn-primary" href="https://www.github.com/ewels/MultiQC">
              <i class="fa fa-github fa-lg"></i> GitHub
            </a>
            <a class="btn btn-block btn-lg btn-primary" href="https://pypi.python.org/pypi/multiqc">
              <i class="icon-python fa-lg"></i>  Python Package Index
            </a>
            <a class="btn btn-block btn-lg btn-primary" href="docs">
              <i class="fa fa-book fa-lg"></i> Documentation
            </a>
            <button type="button" class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#mqc-supported-tools-modal">
              <i class="fa fa-bar-chart"></i> <?php echo count($modules); ?> supported tools
            </button>
            <a class="visible-xs visible-sm btn btn-block btn-lg btn-primary" href="examples/rna-seq/multiqc_report.html">
              <i class="glyphicon glyphicon-search"></i> Example Report
            </a>
            <div class="panel panel-primary" id="quick_install">
              <div class="panel-heading">
                <i class="fa fa-terminal"></i> Quick Install <br>
              </div>
              <div class="panel-body">
                <pre id="pip"><code >pip install multiqc    <span class="comment"># Install</span>
multiqc .              <span class="comment"># Run</span></code></pre>
<pre id="conda" style="display:none;"><code>conda install -c bioconda multiqc
multiqc .</code></pre>
<pre id="manual" style="display:none;"><code>git clone https://github.com/ewels/MultiQC.git
python setup.py install
multiqc .</code></pre>
                <div class="btn-group btn-group-justified btn-group-xs install-switcher" role="group">
                  <a href="#pip" class="btn active">pip</a>
                  <a href="#conda" class="btn">conda</a>
                  <a href="#manual" class="btn">manual</a>
                </div>
              </div>
            </div>
            <p class="sub-panel">Need a little more help? <a href="docs">See the full installation instructions</a>.</small></p>
            
          </div>
        </div>
        
      </div> <!-- end of header -->
    </div>
    
    <!-- Demo Reports -->
    <div class="container hidden-xs hidden-sm">
      
      <h2>Example Reports</h2>
      <div class="row">
        <div class="col-md-4">
          <ul class="list-switch right demo-chooser">
            <li><a href="examples/rna-seq/multiqc_report.html" data-target="#demo-rna-description"  class="active">RNA-Seq</a></li>
            <li><a href="examples/wgs/multiqc_report.html" data-target="#demo-wgs-description" >Whole-Genome Sequencing</a></li>
            <li><a href="examples/bs-seq/multiqc_report.html" data-target="#demo-bsseq-description" >Methylation (Bisfulite)</a></li>
            <li><a href="examples/hi-c/multiqc_report.html" data-target="#demo-hic-description" >Genome Structure (Hi-C)</a></li>
          </ul>
        </div>
        <div class="col-md-8 demo-descriptions">
          <div id="demo-rna-description">
            <p>This report was generated using logs from an analysis accidentally run on ChIP-Seq data from
              the <em>BI Human Reference Epigenome Mapping Project: ChIP-Seq in human subject</em> dataset
               (<a href="http://trace.ncbi.nlm.nih.gov/Traces/sra/?study=SRP001534" target="_blank">SRP001534</a>).</p>
            <p>Initial QC was done using <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" target="_blank">FastQC</a>,
              followed by trimming with <a href="http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/" target="_blank">TrimGalore!</a>
              (a wrapper around <a href="https://github.com/marcelm/cutadapt" target="_blank">cutadapt</a>).
            Reads were aligned using <a href="https://github.com/alexdobin/STAR" target="_blank">STAR</a> and overlaps
            counted with <a href="http://bioinf.wehi.edu.au/featureCounts/" target="_blank">featureCounts</a>.
            <!-- The <a href="http://rseqc.sourceforge.net/" target="_blank">RSeQC</a> package was used to check
            various quality control aspects of the data. -->
          </p>
            <div class="btn-group pull-right" role="group">
              <a href="examples/rna-seq/multiqc_report.zip" class="btn btn-default">
                <span class="fa fa-file-text-o" aria-hidden="true"></span> Download report
              </a>
              <a href="examples/rna-seq/data.zip" class="btn btn-default">
                <span class="fa fa-files-o" aria-hidden="true"></span> Download logs
              </a>
            </div>
            <p>You can download this report and / or the logs used to generate it, to try running MultiQC yourself.</p>
          </div>
          <div id="demo-wgs-description" style="display: none;">
            <p>The data from this report comes from an analysis of HapMap trio samples, run by the
            <a href="https://www.scilifelab.se/platforms/ngi/" target="_blank">National Genomics Infrastructre</a>
            (NGI) at SciLifeLab, Sweden. Initial quality control was done using <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" target="_blank">FastQC</a>
            and <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastq_screen/" target="_blank">FastQ Screen</a>.
            Reads were processed with <a href="https://www.broadinstitute.org/gatk/" taret="_blank">GATK</a> and the aligned reads analysed using 
            <a href="http://broadinstitute.github.io/picard/" target="_blank">Picard</a>. Downstream QC was done using
            <a href="http://qualimap.bioinfo.cipf.es/" target="_blank">Qualimap BamQC</a> and
            <a href="http://snpeff.sourceforge.net/" target="_blank">SnpEff</a>.</p>
            <div class="btn-group pull-right" role="group">
              <a href="examples/wgs/multiqc_report.zip" class="btn btn-default">
                <span class="fa fa-file-text-o" aria-hidden="true"></span> Download report
              </a>
              <a href="examples/wgs/data.zip" class="btn btn-default">
                <span class="fa fa-files-o" aria-hidden="true"></span> Download logs
              </a>
            </div>
            <p>You can download this report and / or the logs used to generate it, to try running MultiQC yourself.
              Note that the example report has some user-specific config settings, seen in the 
              <code><a href="examples/wgs/multiqc_config.yaml" target="_blank">multiqc_config.yaml</a></code> file.</p>
          </div>
          <div id="demo-bsseq-description" style="display: none;">
            <p>The example methylation report is based on analysis of data from the GEO NCBI project
            <a href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE47966" target="_blank">GSE47966</a>,
            from the 2013 Lister <em>et. al.</em> paper <em>Global epigenomic reconfiguration during mammalian brain development</em>.</p>
            <p>Raw data was run through <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" target="_blank">FastQC</a>
            and trimmed using <a href="http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/" target="_blank">Trim Galore!</a>
            (a wrapper around <a href="https://github.com/marcelm/cutadapt" target="_blank">Cutadapt</a>). Reads were
            aligned, deduplicated and cytosine methylation statuses called using
            <a href="http://www.bioinformatics.babraham.ac.uk/projects/bismark/" target="_blank">Bismark</a>.</p>
          </p>
            <div class="btn-group pull-right" role="group">
              <a href="examples/bs-seq/multiqc_report.zip" class="btn btn-default">
                <span class="fa fa-file-text-o" aria-hidden="true"></span> Download report
              </a>
              <a href="examples/bs-seq/data.zip" class="btn btn-default">
                <span class="fa fa-files-o" aria-hidden="true"></span> Download logs
              </a>
            </div>
            <p>You can download this report and / or the logs used to generate it, to try running MultiQC yourself.</p>
          </div>
          <div id="demo-hic-description" style="display: none;">
            <p>This Hi-C MultiQC report was generated using Hi-C data from <a href="mailto:louise.harewood@cruk.cam.ac.uk">Louise Harewood</a> at
              <a href="http://www.cambridgecancer.org.uk/" target="_blank">CRUK Cambridge Institute</a>.
              Reads were run through <a href="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" target="_blank">FastQC</a>
              and then processed using <a href="http://www.bioinformatics.babraham.ac.uk/projects/hicup/" target="_blank">HiCUP</a> (Hi-C User Pipeline).</p>
            <div class="btn-group pull-right" role="group">
              <a href="examples/hi-c/multiqc_report.zip" class="btn btn-default">
                <span class="fa fa-file-text-o" aria-hidden="true"></span> Download report
              </a>
              <a href="examples/hi-c/data.zip" class="btn btn-default">
                <span class="fa fa-files-o" aria-hidden="true"></span> Download logs
              </a>
            </div>
            <p>You can download this report and / or the logs used to generate it, to try running MultiQC yourself.
              Note that the example report has some user-specific config settings, seen in the 
              <code><a href="examples/hi-c/multiqc_config.yaml" target="_blank">multiqc_config.yaml</a></code> file.</p>
          </div>
        </div>
      </div>
      
      <div id="iframe_browser" class="hidden-xs hidden-sm">
        <div id="iframe_browser_header">
          <div id="iframe_browser_buttons"><span></span><span></span><span></span></div>
          <span id="iframe_browser_title">MultiQC Example Reports</span>
          <ul id="iframe_browser_tabs">
            <li><a href="examples/hi-c/multiqc_report.html">Hi-C</a></li>
            <li><a href="examples/bs-seq/multiqc_report.html">Bisulfite Seq</a></li>
            <li><a href="examples/wgs/multiqc_report.html">Whole-Genome Seq</a></li>
            <li class="active"><a href="examples/rna-seq/multiqc_report.html">RNA-Seq</a></li>
          </ul>
        </div>
        <iframe src="examples/rna-seq/multiqc_report.html"></iframe>
      </div>
      
    </div>
    
    <div class="container"><div class="content_block">
      <p class="content-lead">Ever spent ages collecting reports and wading through log file output?<br>
          Here's the answer to your frustrations...</p>

			<section>
				<div class="row">
          <div class="col-md-8">
            <h3>Visualise statistics from your pipeline</h3>
				    <p>MultiQC collects numerical stats from each module at the top the report, so that you can track how your data behaves as it proceeds through your analysis.</p>
            <a class="btn btn-lg btn-default">View Example Report</a>
          </div>
          <div class="col-md-4 text-center">
            <img class="img-circle img-thumbnail" src="images/general_stats.png" alt="General Statistics" />
          </div>
        </div>
      </section>
        
			<section>
				<div class="row">
          <div class="col-md-8">
            <h3>Plot all of your samples together</h3>
				    <p>Visualizing your samples together allows detailed comparison, not possible by scanning one report after another.</p>
            <div class="btn-group">
              <button type="button" class="btn btn-lg btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Example Reports <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-header">Analysis Types</li>
                <li><a href="#">Whole Genome</a></li>
                <li><a href="examples/rna-seq/multiqc_report.html">RNA-Seq</a></li>
                <li><a href="examples/bs-seq/multiqc_report.html">Bisulfite</a></li>
                <li class="dropdown-header">Report Variants</li>
                <li><a href="#">Many Samples</a></li>
                <li><a href="#">Directory Names</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <img class="img-circle img-thumbnail" src="images/overlay_plot.png" alt="FastQC GC Overlay Plot" />
          </div>
        </div>
      </section>

			<section>
				<div class="row">
          <div class="col-md-8">
            <h3>Supports your favourite tools</h3>
				    <p>MultiQC comes supports many common bioinformatics tools out of the box. If you're missing something,
              just create an issue on GitHub to request it - if you have an example log file it's usually pretty fast.</p>
            <button type="button" class="btn btn-default btn-lg" data-toggle="modal" data-target="#mqc-supported-tools-modal">
              View available Modules
            </button>
          </div>
          <div class="col-md-4 text-center">
            <div class="img-circle img-thumbnail">
              <div class="tool-list">
                <ul class="list-inline">
                  <?php foreach($modules as $mod){
                    echo '<li>'.$mod['Name'].'</li>';
                  } ?>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
				<div class="row">
          <div class="col-md-8">
            <h3>Extensible and documented</h3>
				    <p>Want to use this to do something fancy? MultiQC is structured to allow easy extension and customisation
               with plugin hooks, a submodule framework and simple templating. Everything is well documented, with step
               by step instructions for writing your new tool.</p>
            <a class="btn btn-default btn-lg" href="docs">Read the docs</a>
          </div>
          <div class="col-md-4 text-center">
            <img class="img-circle img-thumbnail" src="images/documentation.png" alt="MultiQC Documentation" />
          </div>
        </div>
      </section>
      
      <section>
				<ul class="feature-icons">
					<li><span class="fa fa-lg fa-terminal"></span>Simple installation</li>
					<li><span class="fa fa-lg fa-search"></span>Search any directory</li>
					<li><span class="fa fa-lg fa-bar-chart"></span>View report in a web browser</li>
					<li><span class="fa fa-lg fa-share-alt"></span>Zip file for easy sharing</li>
					<li><span class="fa fa-lg fa-code"></span>Extensible &amp; well documented</li>
				</ul>
      </section>


    	<section class="focus-section">
  			<h2>Install from the <a href="https://pypi.python.org/pypi/multiqc">Python Package Index</a> or
        <a href="https://bioconda.github.io/">Bioconda</a></h2>
  			<p>To install MultiQC, simply run <code>pip install multiqc</code> on the command line.<br>
          If you use conda, you can run <code>conda install -c bioconda multiqc</code> instead.<br>
          See the <a href="docs/#installation">installation instructions</a> for more help.</p>
        <p>
          <a href="docs" class="btn btn-default btn-lg"><i class="fa fa-book fa-lg"></i> Documentation</a>
    			<a target="_blank" href="https://github.com/ewels/MultiQC/" class="btn btn-default btn-lg"><i class="fa fa-github"></i> View on GitHub</a>
    			<a target="_blank" href="https://pypi.python.org/pypi/multiqc" class="btn btn-default btn-lg"><i class="icon-python fa-lg"></i> View on PyPI</a>
        </p>
    	</section>
          
    </div></div> <!-- /content /container -->
    
    <footer id="footer">
      <div class="container">
        <p>Created by Phil Ewels:
          <a target="_blank" href="https://github.com/ewels"><i class="fa fa-github"></i> ewels</a> |
          <a target="_blank" href="https://twitter.com/tallphil"><i class="fa fa-twitter"></i> tallphil</a> |
          <a target="_blank" href="https://se.linkedin.com/in/philewels">LinkedIn</a> | 
          <a target="_blank" href="https://www.researchgate.net/profile/Philip_Ewels">ResearchGate</a>
        </p>
        <a target="_blank" href="http://www.scilifelab.se" class="scilife-footer">
          <img src="images/SLL_logo_blue_white.png">
        </a>
      </div>
    </footer>
    
    <!-- Supported tools modal -->
    <div class="modal fade" id="mqc-supported-tools-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">MultiQC: Supported Tools</h4>
          </div>
          <div class="modal-body">
            <div class="alert alert-info">
              MultiQC currently supports <?php echo count($modules); ?> bioinformatics tools, listed below.
              If you would like another to be added, please <a href="https://github.com/ewels/MultiQC/issues" class="alert-link">open an issue</a>.
            </div>
            <ul class="list-inline mod-list-list">
              <li class="mod-list pre-alignment">Pre-alignment tools</li>
              <li class="mod-list aligners">Alignment tools</li>
              <li class="mod-list post-alignment">Post-alignment tools</li>
            </ul>
            <p class="text-muted"><em><span class="fa fa-book"></span> &nbsp;Click the tool name to go to the MultiQC documentation for that tool.</em></p>
            <table class="table table-condensed">
              <tr>
                <th>Tool Name</th>
                <th>Description</th>
              </tr>
              <?php foreach($modules as $mod){
                echo '<tr><td class="mod-list '.strtolower($mod['section']).'"><a href="'.$mod['docs_url'].'">'.$mod['Name'].'</a></td><td><small>'.$mod['Description'].'</small></td></tr>';
              } ?>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/homepage.js"></script>
    
    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-68098153-1', 'auto');
      ga('send', 'pageview');

    </script>
  </body>
</html>
