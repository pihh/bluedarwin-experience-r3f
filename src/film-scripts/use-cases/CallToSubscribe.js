const Story = [
  { name: "Carla arrives", action: "onCarlaArrive" },
  {
    name: "Carla states her intention of subscribing to a service",
    action: "onCarlaStateIntention",
    description: "Opens popup then unlocks the transitioning"
  },
  { name: "Introduce Cognus Chatbot", action: "onIntroduceCognusChatbot" },
  { name: "Chatbot asks for ID", action: "onAskId" },
  { name: "Carla presents ID", action: "onShowId" },
  { name: "Carla throws ID to Doc Intel", action: "onThrowId" },
  { name: "Introduce Doc Intel", action: "onPresentDocIntel" },
  { name: "Doc intel processes the document.", action: "onProcessDocument" },
  { name: "In the meantime:", action: "onNavigateToMeanWhile" },
  { name: "Present Bluedarwind Automations", action: "onNavigateToAutomations" },
  { name: "Return to Carla", action: "onNavigateToCarla" },
  { name: "Carla recieves confirmation email.", action: "onCarlaRecieveEmail" },
  // { name: "Carla sends a heart", action: "onCarlaShowLove" },
  {
    name: "Punchline - this is just a example of a real process you can automate with Bluedarwin",
    action: "onNavigateToStreamsPunchline",
  },
  { name: "Go to: Easy as (Streams page)", action: "onNavigateToStreams" },
  { name: "Present Bluedarwin Streams", action: "onPresentStreams" },
  { name: "Go to footer", action: "onNavigateToEnd" },
  { name: "Present Contacts, Services ,Team , Other examples", action: "onPresentProjectInfo" },
];

export const CallToSubscribeFilmScript = {
  stories: [
    {
      idx: 0,
      name: Story[0].name,
      description: "Carla arrives",
      camera: {
        position: { x: -16, y: 4, z: 18 },
        fov: 15,
        target: { x: 0, y: 0, z: 0 },
      },
      // camera: { position: { x: 18, y: 0, z: 12}, fov: 15, target:{x:0,y:0,z:0} },
      // camera: { position: { x: 16, y: 8, z: 20}, fov: 15, target:{x:0,y:0,z:0} },
      // camera: { position: { x: 16, y: 3, z: 20}, fov: 15, target:{x:0,y:0,z:0} },
    },
    {
      idx: 5,
      description: "Carla throws ID to Doc Intel and navigates to docIntel",
      name: Story[5].name,
      // camera: { position: { x: 20.0, y: 1, z: 18 }, fov: 15, target:{x:15,y:0,z:0} },
      camera: {
        position: { x: 9.0, y: 1, z: 16 },
        fov: 15,
        target: { x: 15, y: 0, z: 0 },
      },
    },
    {
      idx: 7,
      name: Story[7].name,
      description: "Navigate to meanwhile",
      // camera: { position: { x: 20.0, y: 1, z: 18 }, fov: 15, target:{x:15,y:0,z:0} },
      //camera: { position: { x: 14.0, y: 0, z: -10 }, fov: 15, target:{x:-25,y:0,z:-40} },
      camera: {
        position: { x: 14.0, y: 0, z: -10 },
        fov: 15,
        target: { x: -10, y: 0, z: -15 },
      },
    },
    {
      idx: 8,
      name: Story[8].name,
      description: "Present Automations",
      // camera: { position: { x: 20.0, y: 1, z: 18 }, fov: 15, target:{x:15,y:0,z:0} },
      // camera: { position: { x: 30, y: 3, z: -32 }, fov: 15, target:{x:10,y:0,z:-35} },
      // camera: { position: { x: 1, y: 4, z: -32 }, fov: 15, target:{x:-25,y:0,z:-40} },
      // camera: { position: { x: -46.0, y: 1, z: -45 }, fov: 15, target:{x:-25,y:0,z:-40} },
      camera: {
        position: { x: 3.0, y: 1, z: -32 },
        fov: 15,
        target: { x: -25, y: 0, z: -40 },
      },
    },
    {
      idx: 9,
      name: Story[9].name,
      description: "Back to carla",
      // camera: { position: { x: 20.0, y: 1, z: 18 }, fov: 15, target:{x:15,y:0,z:0} },
      camera: {
        position: { x: 14, y: 1, z: -9 },
        fov: 15,
        target: { x: -3, y: 0, z: 1 },
      },
    },
    {
      idx: 12,
      name: Story[12].name,
      description: "Streams Punchline",
      camera: {
        position: { x: 0, y: 2, z: 0 },
        fov: 15,
        target: { x: 0, y: 10, z: 0 },
      },
    },
    {
      idx: 13,
      name: Story[13].name,
      description: "Go to: Easy as (Streams page)",
      camera: {
        position: { x: 0, y: 35, z: 0 },
        fov: 15,
        target: { x: 0, y: 40, z: 0 },
      },
      object: { scale: { x: 0.25, y: 0.25, z: 0.25 } },
    },
    {
      idx: 15,
      name: Story[15].name,
      description: "onNavigateToEnd",
      camera: {
        position: { x: 25, y: 10, z: 25 },
        fov: 15,
        target: { x: 25, y: 0, z: 25 },
      },

    },
  ],
  acts: Story,
};
