import './styles.scss'
export const Footer = function () {
  return (
    <div id="bluedarwin-footer-menu">
      <div>
        <img src="/textures/images/logo.png" alt="Bluedarwin" />
      </div>
      <div>
        <span>
          <b>Bluedarwin</b>
        </span>
        <a href="https://saip.ibm.com">Official website</a>
        <a href="mailto:filipe.sa1@ibm.com">@bluedarwin</a>
      </div>
      <div>
        <span>December</span>
        <span>2023</span>
      </div>
      <div>
        {/* <span>Open Source</span>
        <span>Developer collective</span> */}
      </div>
      <div className="footer-separator"></div>
      <div>
        <b>
          {/* <a href="https://github.com/"></a> */}
        </b>
        <a href="https://pihh.github.io">Github</a>
        <a href="mailto:filipe.sa1@ibm.com">filipe.sa1@ibm.com</a>
      </div>
    </div>
  );
};
