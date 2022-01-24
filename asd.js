const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  } //notification은 window에서만 작동함. window가아니라면 작동을 하지 않도록함.
  const fireNotif = () => {
    if (Notification.permission !== "greanted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification("Can I steal?", { body: "I love it" });
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <button onClick={triggerNotif}>Hello</button>
    </div>
  );
};
