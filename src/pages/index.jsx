import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";

import {
  Button,
  CodeDocsIcon,
  DocsIcon,
  GitHubIcon,
  GitterIcon,
  Link,
  PythonIcon,
  SearchDirectoryIcon,
  ShareBoxIcon,
  TerminalIcon,
  ViewReportIcon,
} from "website-components";

import { Icon } from "@iconify/react-with-api";

import ExamplesBrowser from "../components/ExamplesBrowser";
import Seo from "../components/Seo";
import SnippetBox from "../components/SnippetBox";
import Tabs from "../components/Tabs";
import YoutubeIframe from "../components/YoutubeIframe";

import Logo from "../images/logo-light.svg";

import Hero from "../layout/Hero";

const HomePage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      exampleReports: allExampleReport(sort: { fields: title }) {
        nodes {
          embed
          title
          path
        }
      }
    }
  `);

  const [videoLanguage, setVideoLanguage] = useState("en");
  const [videoEng, setVideoEng] = useState(0);
  const [videoEsp, setVideoEsp] = useState(0);

  const exampleReports = data.exampleReports.nodes;

  return (
    <>
      <Seo title="MultiQC" />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-8">
              <div className="flex flex-row items-end">
                <div className="w-[430px]">
                  <img src={Logo} alt="MultiQC logo" />
                </div>
                <div className="grow text-right">
                  <Link
                    to="https://github.com/ewels/MultiQC/releases"
                    className="typo-small mr-5 text-xs text-gray-300"
                    noBorder
                  >
                    {/* TODO: Fetch dynamically, don't hard-code version */}
                    Latest release: v1.13
                  </Link>

                  {/* TODO: THIS DOESN'T WORK */}
                  <span
                    className="__dimensions_badge_embed__"
                    data-doi="10.1093/bioinformatics/btw354"
                    data-legend="always"
                    data-style="large_circle"
                  ></span>
                  <script src="https://badge.dimensions.ai/badge.js"></script>
                </div>
              </div>
              <h1 className="typo-h4 mt-8">
                Aggregate results from bioinformatics analyses across many samples into a single report
              </h1>
              <p className="typo-blockquote mt-4 lg:mt-8">
                MultiQC searches a given directory for analysis logs and compiles a HTML report. It's a general use
                tool, perfect for summarising the output from numerous bioinformatics tools.
              </p>
              <div className="row mt-8">
                <div className="col-full lg:col-6 hidden lg:block">
                  {videoLanguage === "en" && (
                    <>
                      {videoEng === 0 && <YoutubeIframe id="BbScv9TcaMg" />}
                      {videoEng === 1 && <YoutubeIframe id="Gg5neIPuiVo" />}
                      {videoEng === 2 && <YoutubeIframe id="cktKbESOOno" />}
                      {videoEng === 3 && <YoutubeIframe id="qPbIlO_KWN0" />}
                    </>
                  )}
                  {videoLanguage === "es" && (
                    <>
                      {videoEsp === 0 && <YoutubeIframe id="WX_qVhJ32g0" />}
                      {videoEsp === 1 && <YoutubeIframe id="E_NJCxwXAGQ" />}
                      {videoEsp === 2 && <YoutubeIframe id="0MfW7Y8Ocak" />}
                    </>
                  )}
                </div>
                <div className="col-full lg:col-6">
                  <Tabs current={videoLanguage} setCurrent={setVideoLanguage} small>
                    <Tabs.Item index="en">English 🇬🇧</Tabs.Item>
                    <Tabs.Item index="es">Español 🇪🇸</Tabs.Item>
                  </Tabs>
                  <div className="mt-3">
                    {videoLanguage === "en" && (
                      <Tabs current={videoEng} setCurrent={setVideoEng} vertical>
                        <Tabs.Item index={0}>Introduction to MultiQC</Tabs.Item>
                        <Tabs.Item index={1}>Installing MultiQC</Tabs.Item>
                        <Tabs.Item index={2}>Running MultiQC</Tabs.Item>
                        <Tabs.Item index={3}>Using MultiQC Reports</Tabs.Item>
                      </Tabs>
                    )}
                    {videoLanguage === "es" && (
                      <Tabs current={videoEsp} setCurrent={setVideoEsp} vertical>
                        <Tabs.Item index={0}>Introducción a MultiQC</Tabs.Item>
                        <Tabs.Item index={1}>Instalación de MultiQC</Tabs.Item>
                        <Tabs.Item index={2}>¿Cómo ejecutar MultiQC?</Tabs.Item>
                      </Tabs>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-full lg:col-4 mt-4 lg:mt-0">
              <Button to="https://www.github.com/ewels/MultiQC" variant="primary" size="md" className="w-full">
                <GitHubIcon className="mr-3 h-6 w-6" />
                GitHub
              </Button>
              <div className="mt-5">
                <Button to="https://pypi.org/project/multiqc/" variant="primary" size="md" className="w-full">
                  <PythonIcon className="mr-3 h-6 w-6" />
                  Python Package Index
                </Button>
              </div>
              <div className="mt-5">
                <Button to="/docs/" variant="primary" size="md" className="w-full">
                  <DocsIcon className="mr-3 h-6 w-6" />
                  Documentation
                </Button>
              </div>
              <div className="mt-5">
                <Button to="/modules/" variant="primary" size="md" className="w-full">
                  <Icon icon="mdi:hammer-wrench" className="mr-3 h-6 w-6" />
                  114 supported tools
                </Button>
              </div>
              <div className="mt-5">
                <Button to="/citation/" variant="primary" size="md" className="w-full">
                  <Icon icon="mdi:paperclip" className="mr-3 h-6 w-6" />
                  Citation
                </Button>
              </div>
              <div className="mt-5">
                <Button to="https://gitter.im/ewels/MultiQC" variant="primary" size="md" className="w-full">
                  <GitterIcon className="mr-3 h-6 w-6" />
                  Get help on Gitter
                </Button>
              </div>
              <div className="mt-5">
                <SnippetBox title="Quick Install">
                  <SnippetBox.Item title="pip">
                    pip install multiqc <span className="text-gray-300"># Install</span>
                    <br />
                    multiqc . <span className="text-gray-300"># Run</span>
                  </SnippetBox.Item>
                  <SnippetBox.Item title="conda">
                    conda install multiqc{" "}
                    <span className="text-gray-300">
                      #{" "}
                      <a href="https://bioconda.github.io/#usage" className="underline">
                        Bioconda config
                      </a>
                    </span>
                    <br />
                    multiqc .
                  </SnippetBox.Item>
                  <SnippetBox.Item title="docker">
                    docker run -t -v `pwd`:`pwd` -w `pwd` <span className="text-gray-300">\</span>
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ewels/multiqc .
                  </SnippetBox.Item>
                </SnippetBox>
                <p className="mt-2 text-xs font-light text-gray-500">
                  Need a little more help?{" "}
                  <a href="/docs/usage/installation/" className="underline underline-offset-4 hover:text-gray-400">
                    See the full installation instructions
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg py-20">
        <div className="row">
          <div className="col-full">
            <h2 className="typo-h3 mb-4">Example reports</h2>
            <p className="typo-blockquote mb-4">
              MultiQC collects numerical stats from each module at the top the report, so that you can track how your
              data behaves as it proceeds through your analysis.
            </p>
            <div className="mt-4 md:mt-8">
              <Button to="/example-reports/" variant="primary" size="md" arrow>
                See all example reports
              </Button>
            </div>
            <div className="mt-8 hidden md:block">
              <ExamplesBrowser items={exampleReports} hasDetails />
            </div>
          </div>
        </div>
      </div>
      <div className="container-sm py-20">
        <div className="text-center">
          <h2 className="typo-h3 mx-auto mb-4 max-w-2xl">
            Ever spent ages collecting reports and wading through log file output?
          </h2>
          <p className="typo-blockquote">Here's the answer to your frustrations...</p>
        </div>
        <div className="row">
          <div className="col-full md:col-6 mt-8 md:mt-16">
            <h3 className="typo-h4 mb-4">Visualise statistics from your pipeline</h3>
            <p className="typo-body">
              MultiQC collects numerical stats from each module at the top the report, so that you can track how your
              data behaves as it proceeds through your analysis.
            </p>
          </div>
          <div className="col-full md:col-6 mt-8 md:mt-16">
            <h3 className="typo-h4 mb-4">Plot all of your samples together</h3>
            <p className="typo-body">
              Visualizing your samples together allows detailed comparison, not possible by scanning one report after
              another.
            </p>
          </div>
          <div className="col-full md:col-6 mt-8 md:mt-16">
            <h3 className="typo-h4 mb-4">Supports your favourite tools</h3>
            <p className="typo-body">
              MultiQC comes supports many common bioinformatics tools out of the box. If you're missing something, just
              create an issue on GitHub to request it - if you have an example log file it's usually pretty fast.
            </p>
          </div>
          <div className="col-full md:col-6 mt-8 md:mt-16">
            <h3 className="typo-h4 mb-4">Extensible and documented</h3>
            <p className="typo-body">
              Want to use this to do something fancy? MultiQC is structured to allow easy extension and customisation
              with plugin hooks, a submodule framework and simple templating. Everything is well documented, with step
              by step instructions for writing your new tool.
            </p>
          </div>
        </div>
      </div>
      <div className="container-md pb-20 md:py-20">
        <div className="row justify-center text-center">
          <div className="col-full md:col-4">
            <h3 className="flex items-center justify-center">
              <TerminalIcon className="mr-3 h-6 w-6 text-gray-500" />
              <span className="typo-intro">Simple installation</span>
            </h3>
          </div>
          <div className="col-full md:col-4 mt-8 md:mt-0">
            <h3 className="flex items-center justify-center">
              <SearchDirectoryIcon className="mr-3 h-6 w-6 text-gray-500" />
              <span className="typo-intro">Search any directory</span>
            </h3>
          </div>
          <div className="col-full md:col-4 mt-8 md:mt-0">
            <h3 className="flex items-center justify-center">
              <ViewReportIcon className="mr-3 h-6 w-6 text-gray-500" />
              <span className="typo-intro">View report in a web browser</span>
            </h3>
          </div>
          <div className="col-full md:col-4 mt-8">
            <h3 className="flex items-center justify-center">
              <ShareBoxIcon className="mr-3 h-6 w-6 text-gray-500" />
              <span className="typo-intro">Zip file for easy sharing</span>
            </h3>
          </div>
          <div className="col-full md:col-4 mt-8">
            <h3 className="flex items-center justify-center">
              <CodeDocsIcon className="mr-3 h-6 w-6 text-gray-500" />
              <span className="typo-intro">Extensible & well documented</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container-lg py-20 text-center">
          <h2 className="typo-h3 mx-auto mb-4 max-w-5xl">
            Install from the{" "}
            <Link to="https://pypi.python.org/pypi/multiqc" className="text-blue-600" noBorder>
              Python Package Index
            </Link>{" "}
            or{" "}
            <Link to="https://bioconda.github.io/recipes/multiqc/README.html" className="text-blue-600" noBorder>
              Bioconda
            </Link>
          </h2>
          <p className="typo-blockquote mx-auto mb-3 max-w-5xl">
            To install MultiQC, simply run{" "}
            <code className="text-md rounded-sm bg-gray-200 px-2 tracking-tighter text-zinc-800">
              pip install multiqc
            </code>{" "}
            on the command line.
          </p>
          <p className="typo-blockquote mx-auto mb-3 max-w-5xl">
            If you use conda, you can run{" "}
            <code className="text-md rounded-sm bg-gray-200 px-2 tracking-tighter text-zinc-800">
              conda install multiqc
            </code>{" "}
            instead.
          </p>
          <p className="typo-blockquote mx-auto mb-3 max-w-5xl">
            See the{" "}
            <Link to="/docs/usage/installation" className="text-blue-600">
              installation instructions
            </Link>{" "}
            for more help.
          </p>
          <div className="mt-5 flex flex-col justify-center md:flex-row lg:mt-10">
            <div className="md:mr-4">
              <Button to="/docs/" variant="secondary" size="md">
                <DocsIcon className="mr-3 h-6 w-6" />
                Documentation
              </Button>
            </div>
            <div className="mt-4 md:mt-0 md:mr-4">
              <Button to="https://github.com/ewels/MultiQC/" variant="secondary" size="md">
                <GitHubIcon className="mr-3 h-6 w-6" />
                View on GitHub
              </Button>
            </div>
            <div className="mt-4 md:mt-0">
              <Button to="/project/multiqc/" variant="secondary" size="md">
                <PythonIcon className="mr-3 h-6 w-6" />
                View on PyPI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
