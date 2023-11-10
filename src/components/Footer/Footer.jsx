import "./styles.scss";
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
        <span>
          <b>Services</b>
        </span>
        <span>Doc Intel</span>
        <span>Cognus Chatbot</span>
      </div>
      <div>
        <span>
          <b></b>
        </span>
        <span>Cognus Streams</span>
        <span>Bluedarwin Automations</span>
      </div>

      <div className="footer-separator"></div>
      <div>
        <b>{/* <a href="https://github.com/"></a> */}</b>
        <a href="https://pihh.github.io">Github</a>
        <a href="mailto:filipe.sa1@ibm.com">filipe.sa1@ibm.com</a>
      </div>
      <div className="footer-separator"></div>
      <div>
        <b>{/* <a href="https://github.com/"></a> */}</b>
        <span>December,2023</span>
        <span>IBM </span>
      </div>

      <div className="footer-ibm-logo"
        
      >
        <img src="/textures/images/ibm.png" alt="IBM" />
      </div>
    </div>
  );
};
