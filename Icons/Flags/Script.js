document.addEventListener("DOMContentLoaded", async () => {
    const icons = document.querySelectorAll("huz-icon");

    if (icons.length === 0) return;

    try {
        const response = await fetch("flags.svg");
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const symbolDefs = svgDoc.querySelector("svg");

        icons.forEach(icon => {
            const id = icon.getAttribute("id");
            if (!id) return;

            const symbol = symbolDefs.querySelector(`symbol#${id}`);
            if (!symbol) {
                console.warn(`Symbol #${id} not found in flags.svg`);
                return;
            }

            // Yeni bir SVG oluştur ve symbol içeriğini ekle
            const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.innerHTML = symbol.innerHTML;

            icon.replaceWith(svgElement);
        });
    } catch (error) {
        console.error("Error loading flags.svg:", error);
    }
});
