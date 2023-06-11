class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
  }

  displayChatBox() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => {
      this.toggleState(chatBox);
    });

    sendButton.addEventListener("click", () => {
      this.onSend(chatBox);
    });

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key == "Enter") {
        this.onSend(chatBox);
      }
    });
  }

  toggleState(chatBox) {
    this.state = !this.state;
    if (this.state) {
      chatBox.classList.add("chatbox--active");
    } else {
      chatBox.classList.remove("chatbox--active");
    }
  }

  onSend(chatBox) {
    var textFeild = chatBox.querySelector("input");
    let text1 = textFeild.value;
    if (text1 === "") {
      return;
    }
    let msg1 = { name: "user", message: text1 };
    this.messages.push(msg1);

    fetch($SCRIPT_ROOT + "/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "bot", message: r.answer };
        this.messages.push(msg2);
        this.renderMessages(chatBox);
        textFeild.value = "";
      })
      .catch((err) => {
        console.error("Error:", err);
        this.renderMessages(chatBox);
        textFeild.value = "";
      });
  }

  renderMessages(chatBox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item) {
        if (item.name == "bot") {
          html +=
            '<div class="messages__item messages__item--visitors">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });
    const chatmessages = chatBox.querySelector(".chatbox__messages");
    chatmessages.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.displayChatBox();
