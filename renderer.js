const remote = require("@electron/remote");

const win = remote.getCurrentWindow();

document.onreadystatechange = (event) => {
	if (document.readyState == "complete") {
		handleWindowControls();

		var clickCount = 0;
		document.getElementById("click").addEventListener("click", () => {
			clickCount++;
			document.getElementById("count").innerText = `Clicks: ${clickCount}`;
			if (clickCount >= 15) {
				win.close();
			}
		});
	}
};

window.onbeforeunload = (event) => {
	win.removeAllListeners();
};

function handleWindowControls() {
	document.getElementById("min-button").addEventListener("click", (event) => {
		win.minimize();
	});

	document.getElementById("max-button").addEventListener("click", (event) => {
		win.maximize();
	});

	document.getElementById("restore-button").addEventListener("click", (event) => {
		win.unmaximize();
	});

	document.getElementById("close-button").addEventListener("click", (event) => {
		win.close();
	});

	toggleMaxRestoreButtons();
	win.on("maximize", toggleMaxRestoreButtons);
	win.on("unmaximize", toggleMaxRestoreButtons);

	function toggleMaxRestoreButtons() {
		if (win.isMaximized()) {
			document.body.classList.add("maximized");
		} else {
			document.body.classList.remove("maximized");
		}
	}
}
