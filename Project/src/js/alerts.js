export default async function loadAlerts(){
    try{
        const response = await fetch("../json/alerts.json");
        const alerts = await response.json();
        const container = document.getElementById("alerts-container");

        alerts.forEach(alert => {
            const div = document.createElement("div");
            div.testContent =alert.message;
            div.style.backgroundColor = alert.background;
            div.style.padding = "1rem";
            div.style.marginBottom = "1rem";
            div.style.borderRadius = "5px";
            div.style.fontWeight = "bold";
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading alerts:", err);
    }
}