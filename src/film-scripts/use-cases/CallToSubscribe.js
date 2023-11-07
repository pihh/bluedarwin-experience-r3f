const Story = [
  "Carla arrives",
  "Carla states her intention of subscribing to a service",
  "Introduce Cognus Chatbot",
  "Chatbot asks for ID",
  "Carla presents ID",
  "Carla throws ID to Doc Intel",
  "Introduce Doc Intel",
  "Doc intel processes the document.",
  "In the meantime:",
  "Present Bluedarwind Automations",
  "Return to Carla",
  "Carla recieves confirmation email.",
  "Carla sends a heart",
  "Punchline - this is just a example of a real process you can automate with Bluedarwin",
  "Go to: Easy as (Streams page)",
  "Present Bluedarwin Streams",
  "Go to footer",
  "Present Contacts, Services ,Team , Other examples",
];

export const CallToSubscribeFilmScript = {
  stories: [
    {
      name: Story[0],
      camera: { position: { x: -16, y: 4, z: 18}, fov: 15, target:{x:0,y:0,z:0} },
      // camera: { position: { x: 18, y: 0, z: 12}, fov: 15, target:{x:0,y:0,z:0} },
      // camera: { position: { x: 16, y: 8, z: 20}, fov: 15, target:{x:0,y:0,z:0} },
      // camera: { position: { x: 16, y: 3, z: 20}, fov: 15, target:{x:0,y:0,z:0} },
    },
    {
      name: Story[1],
      // camera: { position: { x: 20.0, y: 1, z: 18 }, fov: 15, target:{x:15,y:0,z:0} },
      camera: { position: { x: 9.0, y: 1, z: 16 }, fov: 15, target:{x:15,y:0,z:0} },
    },
  ],
};
