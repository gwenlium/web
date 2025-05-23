// Starfield animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 180;

let connectingLineSVG = null;
let lastClickedButton = null;
let orbsAndElementsAreVisible = true; // Added state variable
let starSpeedMultiplier = 5; // New: multiplier for star speed, default to 5x

// --- Slider UI for star speed ---
function createStarSpeedSlider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.id = 'starfield-speed-slider-container'; // For CSS targeting
    sliderContainer.style.position = 'fixed';
    sliderContainer.style.bottom = '54px'; // More space above watermark
    sliderContainer.style.left = '50%';
    sliderContainer.style.transform = 'translateX(-50%)';
    sliderContainer.style.background = 'rgba(26,34,56,0.92)';
    sliderContainer.style.padding = '0.4em 0.8em'; // Smaller, more compact
    sliderContainer.style.borderRadius = '1.2em';
    sliderContainer.style.boxShadow = '0 0 12px #ffe06666';
    sliderContainer.style.zIndex = '40';
    sliderContainer.style.display = 'flex';
    sliderContainer.style.alignItems = 'center';
    sliderContainer.style.gap = '0.5em';
    sliderContainer.style.userSelect = 'none';

    const label = document.createElement('label');
    label.textContent = 'Sternfeld-Geschwindigkeit:';
    label.style.color = '#ffe066';
    label.style.fontWeight = 'bold';
    label.style.fontSize = '0.95em';
    label.style.marginRight = '0.3em';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '3'; // Minimum speed 3x
    slider.max = '10'; // Maximum speed 10x
    slider.step = '0.1'; // Finer control for steps
    slider.value = '5'; // Default value 5x
    slider.style.width = '80px'; // Smaller
    slider.style.height = '18px';
    slider.style.verticalAlign = 'middle';
    slider.title = 'Sternfeld-Geschwindigkeit';

    const valueLabel = document.createElement('span');
    valueLabel.textContent = '5.0x'; // Initial display for 5x
    valueLabel.style.color = '#fff';
    valueLabel.style.fontWeight = 'bold';
    valueLabel.style.fontSize = '0.95em';
    valueLabel.style.marginLeft = '0.2em';

    slider.addEventListener('input', () => {
        starSpeedMultiplier = parseFloat(slider.value);
        valueLabel.textContent = parseFloat(slider.value).toFixed(1) + 'x'; // Display with one decimal place
    });

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(valueLabel);
    document.body.appendChild(sliderContainer);
}
createStarSpeedSlider();
// --- End slider UI ---

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    resizeCanvas();
    if (!modal.classList.contains('hidden') && lastClickedButton) {
        const modalContentElement = modal.querySelector('.modal-content');
        if (modalContentElement) {
            drawConnectingLine(lastClickedButton, modalContentElement);
        }
    }
});
resizeCanvas();

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const r = Math.random() * 1.2 + 0.3; // Original radius
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: r,
      speed: Math.random() * 0.15 + 0.05,
      alpha: Math.random() * 0.5 + 0.5,
      depth: 0.5 + (1.5 - r) / 1.2 * 0.5, // Closer stars (larger r) have smaller depth, further stars (smaller r) have larger depth
      twinkleSpeed: Math.random() * 0.05 + 0.01, // How fast it twinkles
      twinklePhase: Math.random() * Math.PI * 2 // Initial phase for twinkling
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const time = Date.now() / 1000; // Get current time in seconds for twinkling

  for (let star of stars) {
    ctx.save();
    // Twinkling effect: vary alpha
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8; // Modulate between 0.6 and 1.0 of base alpha
    ctx.globalAlpha = star.alpha * twinkle;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    // Parallax effect: speed is influenced by depth
    // Stars with higher depth (further away) move slower relative to the multiplier
    star.y += (star.speed / star.depth) * starSpeedMultiplier;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateStars);
}
animateStars();

// --- German topics and much more info ---
const topics = {
  'geschichte': {
    title: 'Geschichte der Teleskope',
    html: `
      <img src="assets/geschichte_teleskope.jpg" alt="Frühe Teleskope und astronomische Zeichnungen" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      <b>Erfindung:</b> Die Reise des Teleskops begann Anfang des 17. Jahrhunderts in den Niederlanden, als Brillenmacher mit Linsen experimentierten. Hans Lippershey reichte 1608 das erste Patent ein.<br>
      <b>Revolution durch Galileo:</b> Galileo Galilei war nicht der Erfinder, aber er verbesserte das Design erheblich und richtete es 1609 als einer der Ersten systematisch zum Himmel. Seine Beobachtungen der Jupitermonde, der Phasen der Venus und der Mondkrater revolutionierten das Verständnis des Kosmos.<br>
      <b>Entwicklungsschritte:</b>
      <ul>
        <li><b>Refraktoren (Linsenteleskope):</b> Frühe Teleskope nutzten Linsen zur Lichtbrechung. Ihre Qualität wurde durch verbesserte Glasherstellung und Optikdesigns stetig gesteigert.</li>
        <li><b>Reflektoren (Spiegelteleskope):</b> Isaac Newton entwickelte um 1668 das erste Spiegelteleskop, um Farbfehler (chromatische Aberration) von Linsen zu umgehen. Dies eröffnete den Weg zu grösseren Öffnungen.</li>
        <li><b>Riesenteleskope:</b> Im 19. und 20. Jahrhundert wurden immer grössere Teleskope gebaut, wie das Hooker-Teleskop am Mount Wilson, mit dem Edwin Hubble die Expansion des Universums entdeckte.</li>
        <li><b>Weltraumteleskope:</b> Das Hubble Space Telescope (1990) und das James Webb Space Telescope (2021) umgehen die störende Erdatmosphäre und ermöglichen tiefere und schärfere Einblicke ins Universum in verschiedenen Wellenlängen.</li>
      </ul>
      Die Entwicklung ist ein kontinuierlicher Prozess, angetrieben von wissenschaftlicher Neugier und technologischem Fortschritt.
    `
  },
  'erfinder': {
    title: 'Die Wegbereiter des Fernrohrs',
    html: `
      <img src="assets/erfinder_teleskope.jpg" alt="Porträts von Lippershey und Galileo" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Obwohl die genaue Urheberschaft umstritten ist, werden mehrere Schlüsselfiguren mit der Erfindung und frühen Entwicklung des Teleskops in Verbindung gebracht:<br>
      <b>Hans Lippershey (ca. 1570–1619):</b> Ein deutsch-niederländischer Brillenmacher, der 1608 in den Niederlanden ein Patent für ein Fernrohr mit etwa dreifacher Vergrösserung einreichte. Er gilt oft als der offizielle Erfinder, da sein Antrag der früheste dokumentierte ist.<br>
      <b>Sacharias Janssen (ca. 1585–ca. 1632):</b> Ein weiterer niederländischer Brillenmacher, der möglicherweise schon vor Lippershey ein ähnliches Instrument konstruiert hatte. Die Beweislage ist jedoch weniger eindeutig.<br>
      <b>Jacob Metius (nach 1571–1628/1631):</b> Auch er reichte kurz nach Lippershey ein Patent für ein Fernrohr ein. Sein Entwurf wurde jedoch als weniger leistungsfähig eingeschätzt.<br>
      <b>Galileo Galilei (1564–1642):</b> Der italienische Astronom und Physiker erfuhr von der niederländischen Erfindung und baute auf Basis der Beschreibung eigene, deutlich verbesserte Teleskope mit bis zu 30-facher Vergrösserung. Entscheidend war, dass er seine Instrumente konsequent für Himmelsbeobachtungen einsetzte und seine revolutionären Entdeckungen publizierte, was dem Teleskop zu weltweiter Bekanntheit verhalf.
    `
  },
  'zweck': {
    title: 'Der vielfältige Zweck von Teleskopen',
    html: `
      <img src="assets/zweck_teleskope.jpg" alt="Anwendungen von Teleskopen: Astronomie, Navigation, Überwachung" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Teleskope sind Instrumente, die entwickelt wurden, um das Sehen über die natürlichen Grenzen des menschlichen Auges hinaus zu erweitern. Ihr Hauptzweck ist das Sammeln und Fokussieren von elektromagnetischer Strahlung, meist sichtbares Licht, um vergrösserte, hellere oder detailliertere Bilder entfernter Objekte zu erzeugen.<br>
      <b>Frühe Anwendungen:</b>
      <ul>
        <li><b>Militär:</b> Frühe Fernrohre dienten der Beobachtung feindlicher Truppenbewegungen und gaben einen strategischen Vorteil.</li>
        <li><b>Seefahrt und Handel:</b> In der Navigation halfen sie, Landmarken oder andere Schiffe frühzeitig zu erkennen.</li>
      </ul>
      <b>Moderne Anwendungen (primär wissenschaftlich):</b>
      <ul>
        <li><b>Astronomische Forschung:</b> Dies ist heute der Hauptzweck. Teleskope ermöglichen die Untersuchung von Planeten, Sternen, Galaxien und anderen kosmischen Phänomenen. Sie helfen uns, den Ursprung und die Entwicklung des Universums zu verstehen.</li>
        <li><b>Entdeckung neuer Himmelskörper:</b> Kometen, Asteroiden, Exoplaneten und ferne Galaxien werden kontinuierlich mit Teleskopen entdeckt.</li>
        <li><b>Physikalische Studien:</b> Durch Analyse des Lichts (Spektroskopie) können Astronomen die Zusammensetzung, Temperatur, Geschwindigkeit und Magnetfelder von Himmelsobjekten bestimmen.</li>
        <li><b>Überwachung des Weltraums:</b> Erdnahe Objekte (NEOs) werden überwacht, um potenzielle Kollisionsgefahren frühzeitig zu erkennen.</li>
      </ul>
      Vom einfachen Werkzeug zur Erweiterung der Sicht bis hin zu komplexen Observatorien, die das Universum erforschen – der Zweck von Teleskopen hat sich enorm erweitert.
    `
  },
  'entdeckungen': {
    title: 'Bahnbrechende Entdeckungen durch Teleskope',
    html: `
      <img src="assets/entdeckungen_teleskope.jpg" alt="Hubble Deep Field - eine berühmte astronomische Entdeckung" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Seit ihrer Erfindung haben Teleskope unser Weltbild revolutioniert. Hier einige der wichtigsten Entdeckungen:
      <ul>
        <li><b>Jupitermonde (Galilei, 1610):</b> Die Entdeckung von vier Monden, die Jupiter umkreisen, stützte das heliozentrische Weltbild und zeigte, dass nicht alles die Erde umkreist.</li>
        <li><b>Phasen der Venus (Galilei, 1610):</b> Ähnlich wie der Mond durchläuft die Venus Phasen, was nur im heliozentrischen Modell erklärbar ist.</li>
        <li><b>Mondkrater und Sonnenflecken (Galilei):</b> Zeigten, dass Himmelskörper nicht perfekt sind, sondern Oberflächenstrukturen und Veränderungen aufweisen.</li>
        <li><b>Ringe des Saturn (Huygens, 1655):</b> Christiaan Huygens identifizierte die zuvor rätselhaften "Henkel" des Saturn als ein Ringsystem.</li>
        <li><b>Entdeckung von Uranus (Herschel, 1781) und Neptun (Galle, Le Verrier, Adams, 1846):</b> Erweiterung des bekannten Sonnensystems.</li>
        <li><b>Struktur der Milchstrasse und Existenz anderer Galaxien (Hubble, 1920er):</b> Edwin Hubble zeigte, dass die Milchstrasse nur eine von vielen Galaxien ist und das Universum viel grösser ist als gedacht.</li>
        <li><b>Expansion des Universums (Hubble, 1929):</b> Die Beobachtung, dass sich Galaxien voneinander entfernen (Rotverschiebung), führte zur Urknalltheorie.</li>
        <li><b>Quasare, Pulsare, Schwarze Löcher:</b> Entdeckungen, die unser Verständnis extremer physikalischer Bedingungen erweiterten.</li>
        <li><b>Kosmische Mikrowellenhintergrundstrahlung (Penzias & Wilson, 1964):</b> Ein Echo des Urknalls.</li>
        <li><b>Exoplaneten (ab 1990er):</b> Die Entdeckung von Tausenden Planeten ausserhalb unseres Sonnensystems, was die Frage nach Leben im All neu befeuert.</li>
        <li><b>Beschleunigte Expansion des Universums (1998):</b> Entdeckung der Dunklen Energie.</li>
      </ul>
      Jede neue Generation von Teleskopen bringt weitere, oft unerwartete Entdeckungen.
    `
  },
  'physik': {
    title: 'Die Physik hinter den Teleskopen',
    html: `
      <img src="assets/physik_teleskope.jpg" alt="Diagramm der Lichtwege in Refraktor- und Reflektor-Teleskopen" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Teleskope funktionieren durch das Sammeln und Fokussieren von elektromagnetischer Strahlung. Die grundlegenden physikalischen Prinzipien sind Optik und Wellentheorie.<br>
      <b>Grundprinzip:</b>
      <ul>
        <li><b>Lichtsammelvermögen:</b> Die wichtigste Eigenschaft eines Teleskops ist seine Öffnung (Durchmesser des Objektivs/Spiegels). Je grösser die Öffnung, desto mehr Licht kann gesammelt werden, was lichtschwächere Objekte sichtbar macht. Das Lichtsammelvermögen steigt mit dem Quadrat der Öffnung.</li>
        <li><b>Auflösungsvermögen:</b> Die Fähigkeit, feine Details zu unterscheiden. Sie hängt von der Öffnung und der Wellenlänge des Lichts ab. Grössere Öffnungen und kürzere Wellenlängen führen zu höherer Auflösung (Beugungsbegrenzung).</li>
        <li><b>Vergrösserung:</b> Das Verhältnis der Brennweite des Objektivs zur Brennweite des Okulars. Eine hohe Vergrösserung ist nur sinnvoll, wenn das Teleskop genügend Licht sammelt und eine gute Auflösung hat.</li>
      </ul>
      <b>Wichtige Begriffe:</b>
      <ul>
        <li><b>Brennweite:</b> Der Abstand von der Linse/Spiegel zum Punkt, an dem parallele Lichtstrahlen fokussiert werden.</li>
        <li><b>Öffnungsverhältnis (f-ratio):</b> Verhältnis von Brennweite zu Öffnung (z.B. f/10). Beeinflusst Helligkeit des Bildes und das Sichtfeld.</li>
      </ul>
      <b>Spektralbereiche:</b> Teleskope sind nicht auf sichtbares Licht beschränkt. Es gibt Teleskope für:
      <ul>
        <li><b>Radiowellen:</b> Grosse Schüsseln (z.B. VLA, ALMA).</li>
        <li><b>Infrarot:</b> Oft gekühlt, um Eigenstrahlung zu minimieren (z.B. Spitzer, JWST). Wichtig für die Beobachtung von Staubwolken und jungen Sternen.</li>
        <li><b>Ultraviolett, Röntgen, Gammastrahlen:</b> Müssen im Weltraum betrieben werden, da die Atmosphäre diese Strahlung absorbiert (z.B. Chandra, Fermi).</li>
      </ul>
      <b>Herausforderungen:</b>
      <ul>
        <li><b>Atmosphärische Störungen (Seeing):</b> Luftunruhe in der Erdatmosphäre verschlechtert die Bildqualität. Adaptive Optik kann dies teilweise korrigieren. Weltraumteleskope umgehen dieses Problem vollständig.</li>
        <li><b>Lichtverschmutzung:</b> Künstliches Licht erschwert die Beobachtung lichtschwacher Objekte.</li>
      </ul>
    `
  },
  'typen': {
    title: 'Vielfalt der Teleskop-Typen',
    html: `
      <img src="assets/typen_teleskope.jpg" alt="Collage verschiedener Teleskoptypen: Refraktor, Reflektor, Radioteleskop, Weltraumteleskop" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Teleskope lassen sich nach verschiedenen Kriterien klassifizieren, hauptsächlich nach der Art, wie sie Licht sammeln und fokussieren, oder nach dem Wellenlängenbereich, für den sie konzipiert sind.
      <ul>
        <li><b>Linsenteleskop (Refraktor):</b>
          <ul>
            <li>Nutzt ein Objektiv aus einer oder mehreren Linsen, um das Licht zu brechen (Refraktion) und zu bündeln.</li>
            <li>Vorteile: Geschlossener Tubus schützt Optik, kontrastreiche Bilder, wartungsarm.</li>
            <li>Nachteile: Anfällig für Farbfehler (chromatische Aberration), teuer und schwer bei grossen Öffnungen.</li>
            <li>Beispiele: Kleine Einsteigerteleskope, historische Sternwarten-Teleskope.</li>
          </ul>
        </li>
        <li><b>Spiegelteleskop (Reflektor):</b>
          <ul>
            <li>Nutzt einen Hauptspiegel (meist parabolisch), um das Licht zu reflektieren und zu sammeln. Es gibt verschiedene Bauarten (Newton, Cassegrain, Ritchey-Chrétien etc.), die sich in der Anordnung weiterer Spiegel unterscheiden.</li>
            <li>Vorteile: Keine Farbfehler, kostengünstiger für grosse Öffnungen.</li>
            <li>Nachteile: Offener Tubus kann verschmutzen, eventuell Justage erforderlich, Abschattung durch Fangspiegel.</li>
            <li>Beispiele: Die meisten grossen Forschungsteleskope, viele Amateur-Teleskope (z.B. Dobson).</li>
          </ul>
        </li>
        <li><b>Katadioptrisches Teleskop (Spiegel-Linsen-System):</b>
          <ul>
            <li>Kombiniert Spiegel und Linsen, um die Vorteile beider Systeme zu nutzen und Nachteile zu minimieren (z.B. Schmidt-Cassegrain, Maksutov-Cassegrain).</li>
            <li>Vorteile: Kompakte Bauweise bei langer Brennweite, gute Bildqualität.</li>
            <li>Nachteile: Teurer als reine Reflektoren gleicher Öffnung.</li>
          </ul>
        </li>
        <li><b>Radioteleskop:</b>
          <ul>
            <li>Empfängt Radiowellen aus dem All mit grossen Antennenschüsseln oder Dipolantennen-Feldern.</li>
            <li>Ermöglichen die Untersuchung von Phänomenen, die im sichtbaren Licht nicht oder kaum beobachtbar sind (z.B. kalte Gaswolken, Pulsare, aktive galaktische Kerne).</li>
            <li>Oft zu Interferometern zusammengeschaltet, um höhere Auflösungen zu erzielen (z.B. Event Horizon Telescope).</li>
          </ul>
        </li>
        <li><b>Weltraumteleskop:</b>
          <ul>
            <li>Operieren ausserhalb der Erdatmosphäre, um deren Filterwirkung und Störungen (Seeing, Wetter) zu umgehen.</li>
            <li>Ermöglichen Beobachtungen in Wellenlängenbereichen, die vom Boden aus nicht zugänglich sind (UV, Röntgen, Gamma, Teile des Infrarot).</li>
            <li>Beispiele: Hubble (UV/Vis/NIR), James Webb (Infrarot), Chandra (Röntgen).</li>
          </ul>
        </li>
      </ul>
    `
  },
  'funktion': {
    title: 'So funktioniert ein Teleskop',
    html: `
      <img src="assets/funktion_teleskope.jpg" alt="Vereinfachtes Diagramm der Funktionsweise eines Teleskops" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Die grundlegende Funktion eines Teleskops ist es, Licht (oder andere elektromagnetische Strahlung) von entfernten Objekten zu sammeln und so zu manipulieren, dass ein beobachtbares oder messbares Bild entsteht.
      <br><br>
      <b>Die Hauptkomponenten und ihr Zusammenspiel:</b>
      <ol>
        <li><b>Objektiv (Primäroptik):</b>
          <ul>
            <li>Dies ist das Herzstück des Teleskops. Es ist entweder eine Linse (bei Refraktoren) oder ein Spiegel (bei Reflektoren).</li>
            <li>Seine Aufgabe ist es, das von einem Objekt kommende parallele Licht zu sammeln und in einem Punkt, dem Brennpunkt (Fokus), zu bündeln. Je grösser der Durchmesser (Öffnung) des Objektivs, desto mehr Licht wird gesammelt und desto lichtschwächere Objekte können gesehen bzw. feiner aufgelöst werden.</li>
          </ul>
        </li>
        <li><b>Okular (Sekundäroptik):</b>
          <ul>
            <li>Das Okular ist eine kleinere Linse oder Linsengruppe, durch die der Beobachter schaut. Es funktioniert wie eine Lupe und vergrössert das vom Objektiv erzeugte reelle Bild.</li>
            <li>Durch Wechseln des Okulars kann die Vergrösserung des Teleskops verändert werden.</li>
            <li>Bei fotografischer oder spektroskopischer Nutzung kann anstelle des Okulars ein Detektor (CCD-Chip, Fotoplatte) oder ein Spektrograph platziert werden.</li>
          </ul>
        </li>
        <li><b>Tubus:</b>
          <ul>
            <li>Der Tubus hält Objektiv und Okular (bzw. Detektor) im korrekten Abstand und schützt die Optik vor Streulicht, Staub und mechanischer Beanspruchung. Bei Spiegelteleskopen sorgt er auch für die richtige Ausrichtung der Spiegel.</li>
          </ul>
        </li>
        <li><b>Montierung:</b>
          <ul>
            <li>Die Montierung trägt das Teleskop und ermöglicht dessen Ausrichtung auf Himmelsobjekte. Sie muss stabil sein, um Vibrationen zu vermeiden, und präzise Bewegungen erlauben.</li>
            <li>Es gibt verschiedene Typen, z.B. azimutale (Bewegung in Höhe und Azimut) und parallaktische (eine Achse parallel zur Erdachse ausgerichtet, um die Erddrehung leichter zu kompensieren). Viele moderne Teleskope sind computergesteuert (GoTo-Montierungen).</li>
          </ul>
        </li>
      </ol>
      <b>Beobachtungsarten:</b>
      <ul>
        <li><b>Visuell:</b> Direkte Beobachtung mit dem Auge durch das Okular.</li>
        <li><b>Fotografie (Astrofotografie):</b> Aufzeichnung des Bildes mit Kameras.</li>
        <li><b>Spektroskopie:</b> Zerlegung des Lichts in seine Spektralfarben, um Informationen über Zusammensetzung, Temperatur, Geschwindigkeit etc. des Objekts zu gewinnen.</li>
        <li><b>Photometrie:</b> Messung der Helligkeit von Objekten und deren Veränderungen.</li>
      </ul>
    `
  },
  'beruehmt': {
    title: 'Ikonen der Himmelsbeobachtung: Berühmte Teleskope',
    html: `
      <img src="assets/beruehmte_teleskope.jpg" alt="Das Hubble Weltraumteleskop im Orbit" style="width:100%; max-height:200px; object-fit:cover; margin-top:10px; border-radius:5px; margin-bottom:15px;">
      Viele Teleskope haben die Astronomie geprägt. Hier eine Auswahl:
      <ul>
        <li><b>Hubble-Weltraumteleskop (HST):</b>
          <ul>
            <li>Gestartet 1990, umkreist die Erde.</li>
            <li>Hat unser Verständnis des Universums revolutioniert mit ikonischen Bildern von Galaxien, Nebeln und Beiträgen zur Kosmologie (z.B. Alter des Universums, Dunkle Energie). Beobachtet im ultravioletten, sichtbaren und nahen Infrarotbereich.</li>
          </ul>
        </li>
        <li><b>James Webb Space Telescope (JWST):</b>
          <ul>
            <li>Gestartet 2021, positioniert am Lagrange-Punkt L2.</li>
            <li>Optimiert für Infrarotbeobachtungen, um die ersten Sterne und Galaxien, die Entstehung von Sternen und Planetensystemen sowie Exoplaneten zu untersuchen. Gilt als Nachfolger von Hubble.</li>
          </ul>
        </li>
        <li><b>Very Large Telescope (VLT):</b>
          <ul>
            <li>Betrieben von der Europäischen Südsternwarte (ESO) in der Atacama-Wüste, Chile.</li>
            <li>Besteht aus vier Hauptteleskopen mit 8,2-Meter-Spiegeln und vier Hilfsteleskopen. Kann als Interferometer zusammengeschaltet werden (VLTI) für extrem hohe Auflösung.</li>
            <li>Hat bedeutende Entdeckungen zu Exoplaneten, dem supermassiven Schwarzen Loch im Zentrum unserer Galaxie und fernen Galaxien geliefert.</li>
          </ul>
        </li>
        <li><b>Gran Telescopio Canarias (GTC / La Palma):</b>
          <ul>
            <li>Mit einem segmentierten Spiegel von 10,4 Metern Durchmesser eines der grössten optischen Einzelteleskope der Welt.</li>
            <li>Steht auf La Palma, Kanarische Inseln.</li>
          </ul>
        </li>
        <li><b>Keck-Observatorium (Hawaii, USA):</b>
          <ul>
            <li>Zwei Teleskope mit je 10-Meter-Spiegeln auf dem Mauna Kea.</li>
            <li>Pioniere in der Nutzung segmentierter Spiegel und adaptiver Optik.</li>
          </ul>
        </li>
        <li><b>Arecibo-Observatorium (Puerto Rico, 1963–2020):</b>
          <ul>
            <li>War mit 305 Metern Durchmesser jahrzehntelang das grösste Einzelantennen-Radioteleskop der Welt.</li>
            <li>Berühmt für Entdeckungen von Pulsaren, Studien der Erdatmosphäre und die Arecibo-Botschaft. Leider 2020 kollabiert.</li>
          </ul>
        </li>
         <li><b>Square Kilometre Array (SKA):</b>
          <ul>
            <li>Ein im Bau befindliches Radioteleskop-Netzwerk in Australien und Südafrika.</li>
            <li>Wird nach Fertigstellung das grösste Radioteleskop der Welt sein und fundamentale Fragen der Astrophysik und Kosmologie adressieren.</li>
          </ul>
        </li>
      </ul>
    `
  }
};

// Modal logic (German)
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

function drawConnectingLine(buttonElement, modalDialogElement) {
    if (!buttonElement || !modalDialogElement) return;

    if (!connectingLineSVG) {
        connectingLineSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        connectingLineSVG.id = 'connecting-line-svg';
        connectingLineSVG.style.position = 'fixed';
        connectingLineSVG.style.top = '0';
        connectingLineSVG.style.left = '0';
        connectingLineSVG.style.width = '100vw';
        connectingLineSVG.style.height = '100vh';
        connectingLineSVG.style.pointerEvents = 'none';
        connectingLineSVG.style.zIndex = '9'; // Below modal (10), above orbs (1/3)
        document.body.appendChild(connectingLineSVG);
    }
    connectingLineSVG.innerHTML = ''; // Clear previous line

    const btnRect = buttonElement.getBoundingClientRect();
    const modalRect = modalDialogElement.getBoundingClientRect();

    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;

    // Calculate the closest point on the modal border to the button's center
    let endX, endY;
    const candidatePoints = [
        { x: modalRect.left, y: Math.max(modalRect.top, Math.min(startY, modalRect.bottom)) }, // Left edge
        { x: modalRect.right, y: Math.max(modalRect.top, Math.min(startY, modalRect.bottom)) }, // Right edge
        { x: Math.max(modalRect.left, Math.min(startX, modalRect.right)), y: modalRect.top },    // Top edge
        { x: Math.max(modalRect.left, Math.min(startX, modalRect.right)), y: modalRect.bottom }  // Bottom edge
    ];

    let minDistanceSq = Infinity;
    candidatePoints.forEach(p => {
        const distSq = Math.pow(p.x - startX, 2) + Math.pow(p.y - startY, 2);
        if (distSq < minDistanceSq) {
            minDistanceSq = distSq;
            endX = p.x;
            endY = p.y;
        }
    });

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', '#ffe066');
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-dasharray', '8, 4');
    connectingLineSVG.appendChild(line);
}

function removeConnectingLine() {
    if (connectingLineSVG) {
        connectingLineSVG.innerHTML = '';
    }
    lastClickedButton = null;
}

function openModal(topic, clickedElement) {
  if (topics[topic]) {
    modalBody.innerHTML = `<h2>${topics[topic].title}</h2><div>${topics[topic].html}</div>`;
    modal.classList.remove('hidden');
    if (clickedElement) { // Only update if a new element is clicked
        lastClickedButton = clickedElement;
    }
    // Ensure modalContent is used for line drawing as it's the visual block
    const modalContentElement = modal.querySelector('.modal-content');
    if (lastClickedButton && modalContentElement) { // Check lastClickedButton before drawing
      drawConnectingLine(lastClickedButton, modalContentElement);
    }
  }
}
function closeModal() {
  modal.classList.add('hidden');
  removeConnectingLine();
}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.querySelectorAll('.star-node').forEach(node => {
  node.addEventListener('click', function() { openModal(node.dataset.topic, this); });
});

// Modified click listener for the central telescope icon
// Enhanced: Seamless, warp speed transition to facts.html
const telescopeIcon = document.getElementById('telescopeIcon');
telescopeIcon.addEventListener('click', function() {
    // Prevent double trigger
    if (telescopeIcon._transitioning) return;
    telescopeIcon._transitioning = true;
    const infographic = document.getElementById('infographic');
    infographic.style.transition = 'opacity 0.5s cubic-bezier(.34,1.56,.64,1)';
    infographic.style.opacity = '0';
    // Fade out starfield
    canvas.style.transition = 'opacity 0.5s cubic-bezier(.34,1.56,.64,1)';
    canvas.style.opacity = '0.2';
    // Add dark overlay
    let overlay = document.createElement('div');
    overlay.id = 'facts-transition-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(26,34,56,0.0) 0%, rgba(26,34,56,0.8) 80%, #070a18 100%)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.7s cubic-bezier(.34,1.56,.64,1)';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '1'; }, 200);

    // --- Warp Speed Animation ---
    // Remove any previous warp canvas
    let oldWarp = document.getElementById('warp-canvas');
    if (oldWarp) oldWarp.remove();
    // Create warp canvas
    const warpCanvas = document.createElement('canvas');
    warpCanvas.id = 'warp-canvas';
    warpCanvas.style.position = 'fixed';
    warpCanvas.style.left = '0';
    warpCanvas.style.top = '0';
    warpCanvas.style.width = '100vw';
    warpCanvas.style.height = '100vh';
    warpCanvas.style.pointerEvents = 'none';
    warpCanvas.style.zIndex = '1100';
    document.body.appendChild(warpCanvas);
    // Set canvas size
    function resizeWarpCanvas() {
        warpCanvas.width = window.innerWidth;
        warpCanvas.height = window.innerHeight;
    }
    resizeWarpCanvas();
    window.addEventListener('resize', resizeWarpCanvas);
    // Star streaks
    const streaks = [];
    const streakCount = 120;
    const cx = window.innerWidth/2;
    const cy = window.innerHeight/2;
    for (let i = 0; i < streakCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = 12 + Math.random() * 10;
        const len = 60 + Math.random() * 80;
        streaks.push({
            angle,
            speed,
            len,
            r: 0,
            width: 1.2 + Math.random()*1.8,
            color: `rgba(255,255,230,${0.7 + Math.random()*0.3})`
        });
    }
    let warpStart = null;
    function animateWarp(ts) {
        if (!warpStart) warpStart = ts;
        const t = (ts - warpStart) / 1000;
        const ctx = warpCanvas.getContext('2d');
        ctx.clearRect(0,0,warpCanvas.width,warpCanvas.height);
        for (let s of streaks) {
            // Accelerate outward
            s.r += s.speed * (1.2 + t*2.5) * (0.7 + t*0.6);
            const x1 = cx + Math.cos(s.angle) * s.r;
            const y1 = cy + Math.sin(s.angle) * s.r;
            const x2 = cx + Math.cos(s.angle) * (s.r + s.len + t*60);
            const y2 = cy + Math.sin(s.angle) * (s.r + s.len + t*60);
            ctx.save();
            ctx.strokeStyle = s.color;
            ctx.lineWidth = s.width + t*1.2;
            ctx.shadowColor = '#ffe066';
            ctx.shadowBlur = 16 + t*24;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        }
        if (t < 1.2) {
            requestAnimationFrame(animateWarp);
        }
    }
    requestAnimationFrame(animateWarp);

    setTimeout(() => {
        overlay.style.opacity = '1';
        window.location.href = 'facts.html';
    }, 1200);
});

// Draw a simple SVG telescope in the center
const telescopeDiv = document.getElementById('telescopeIcon');
telescopeDiv.textContent = '';

// --- TELESCOPE MINI-GAME ---
// Add a draggable telescope lens to discover hidden facts
const telescopeGame = document.createElement('div');
telescopeGame.id = 'telescope-game';
telescopeGame.innerHTML = `
  <span class="close-btn">&times;</span>
  <div id="telescope-lens"><div id="telescope-fact"></div></div>
`;
document.body.appendChild(telescopeGame);

const facts = [
  'Das Hubble-Teleskop umkreist die Erde in ca. 540 km Höhe.',
  'Das grösste optische Einzelteleskop ist das Gran Telescopio Canarias (10,4 m Spiegel).',
  'Radioteleskope können so gross wie ein Fussballfeld sein!',
  'Galileo baute 1609 sein erstes Teleskop.',
  'Das James Webb Space Telescope sieht Infrarotlicht aus der Frühzeit des Universums.',
  'Einige Teleskope stehen im Weltall, um die Atmosphäre zu umgehen.',
  'Adaptive Optik gleicht Luftunruhe aus und macht Bilder schärfer.',
  'Mit Teleskopen wurden über 5000 Exoplaneten entdeckt.',
  'Das VLT in Chile besteht aus vier 8,2-m-Teleskopen.',
  'Das Arecibo-Observatorium war das grösste Radioteleskop der Welt.'
];
const lens = document.getElementById('telescope-lens');
const factDiv = document.getElementById('telescope-fact');
let dragging = false, offsetX = 0, offsetY = 0;

function randomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}
function showTelescopeGame() {
  telescopeGame.classList.add('active');
  moveLens(window.innerWidth/2-110, window.innerHeight/2-110);
  factDiv.textContent = randomFact();
}
function hideTelescopeGame() {
  telescopeGame.classList.remove('active');
}
telescopeGame.querySelector('.close-btn').onclick = hideTelescopeGame;

document.getElementById('telescopeIcon').ondblclick = showTelescopeGame;

function moveLens(x, y) {
  lens.style.left = x + 'px';
  lens.style.top = y + 'px';
}
lens.onmousedown = function(e) {
  dragging = true;
  offsetX = e.clientX - lens.offsetLeft;
  offsetY = e.clientY - lens.offsetTop;
  lens.style.cursor = 'grabbing';
};
document.onmousemove = function(e) {
  if (!dragging) return;
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;
  moveLens(x, y);
};
document.onmouseup = function() {
  if (dragging) {
    dragging = false;
    lens.style.cursor = 'grab';
    factDiv.textContent = randomFact();
  }
};

// --- Solar System Infographic (Animated Orbits, Improved SVG) ---
const infographic = document.getElementById('infographic');
const nodes = Array.from(document.querySelectorAll('.star-node'));
const center = document.getElementById('telescopeIcon');

// Remove previous orbit SVG if any
let oldOrbits = document.getElementById('orbit-svg');
if (oldOrbits) oldOrbits.remove();

// Create SVG for orbits (with glow and dashed lines)
const orbitSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
orbitSVG.setAttribute('id', 'orbit-svg');
orbitSVG.style.position = 'absolute';
orbitSVG.style.left = '0';
orbitSVG.style.top = '0';
orbitSVG.style.width = '100%';
orbitSVG.style.height = '100%';
orbitSVG.style.zIndex = '1';
// SVG filter for glow
orbitSVG.innerHTML = `
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
`;
infographic.appendChild(orbitSVG);

// Arrange nodes in orbits (2D, always front view)
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const orbitRadii = [180, 240, 300, 360, 420, 480, 540, 600];
const nodeAngles = [0, 45, 90, 135, 180, 225, 270, 315];

// Draw orbits as glowing dashed ellipses
orbitRadii.forEach((r, i) => {
  const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  ellipse.setAttribute('cx', centerX);
  ellipse.setAttribute('cy', centerY);
  ellipse.setAttribute('rx', r);
  ellipse.setAttribute('ry', r * 0.5);
  ellipse.setAttribute('stroke', '#ffe066');
  ellipse.setAttribute('stroke-width', '2.5');
  ellipse.setAttribute('fill', 'none');
  ellipse.setAttribute('opacity', '0.45');
  ellipse.setAttribute('stroke-dasharray', '16 10');
  ellipse.setAttribute('filter', 'url(#glow)');
  orbitSVG.appendChild(ellipse);
});

// Animate nodes around orbits
let startTime = null;
function animateOrbits(ts) {
  if (!startTime) startTime = ts;
  const t = (ts - startTime) / 1000; // seconds

  const currentOrbScale = orbsAndElementsAreVisible ? 1 : 0.01;
  // Use the default opacity from CSS for .star-node (0.96) when visible
  const currentOrbOpacity = orbsAndElementsAreVisible ? 0.96 : 0;
  const currentOrbPointerEvents = orbsAndElementsAreVisible ? 'auto' : 'none';

  nodes.forEach((node, i) => {
    // Each node orbits at a different speed
    const speed = 0.12 + 0.04 * i;
    const angle = nodeAngles[i] * Math.PI / 180 + t * speed;
    const r = orbitRadii[i % orbitRadii.length];
    
    // Bobbing effect (vertical)
    const bob = Math.sin(t * 1.2 + i) * 8;
    // Sway effect (horizontal)
    const sway = Math.cos(t * 0.9 + i * 0.5) * 6; 

    const x = centerX + Math.cos(angle) * r + sway; // Added sway
    const y = centerY + Math.sin(angle) * r * 0.5 + bob;
    
    // Node's own slow rotation
    const nodeRotation = (t * 10 + i * 20); // Degrees, slow rotation, varies per node

    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.style.transform = `translate(-50%, -50%) scale(${currentOrbScale}) rotate(${nodeRotation}deg)`;
    node.style.opacity = currentOrbOpacity;
    node.style.pointerEvents = currentOrbPointerEvents;
  });
  // Animate telescope glow
  const pulse = 1 + 0.08 * Math.sin(t * 2);
  center.style.transform = `translate(-50%, -50%) scale(${1.2 * pulse})`;

  // Update orbitSVG opacity (default is 0.45)
  orbitSVG.style.opacity = orbsAndElementsAreVisible ? 0.45 : 0;
  // orbitSVG pointer-events are already 'none' globally, so no change needed here.

  // Redraw connecting line if modal is open
  if (!modal.classList.contains('hidden') && lastClickedButton) {
    const modalContentElement = modal.querySelector('.modal-content');
    if (modalContentElement) {
        drawConnectingLine(lastClickedButton, modalContentElement);
    }
  }

  requestAnimationFrame(animateOrbits);
}
requestAnimationFrame(animateOrbits);

// Center telescope as the "sun" (with improved SVG)
center.style.left = centerX + 'px';
center.style.top = centerY + 'px';
center.style.transform = 'translate(-50%, -50%) scale(1.2)';
center.style.zIndex = 10;
center.innerHTML = '<img src="assets/telescope.svg" alt="Telescope Icon" style="width:64px;height:64px;display:block;margin:auto;filter: drop-shadow(0 0 8px #ffe06688);object-fit:contain;aspect-ratio:1/1;background:none;" />';

// --- Solar System Infographic (SVG polish & custom planet icons) ---
// Remove custom SVG planet icons, restore text labels only
nodes.forEach((node, i) => {
  node.innerHTML = `<span class="planet-label">${node.textContent.replace(/<[^>]+>/g, '')}</span>`;
});

// --- Add zooming (mouse wheel and pinch) ---
let zoom = 1;
const minZoom = 0.5;
const maxZoom = 2.5;
const infographicContainer = document.body;

function setZoom(newZoom) {
  zoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
  infographic.style.transform = `scale(${zoom})`;
}

// Mouse wheel zoom
infographic.addEventListener('wheel', (e) => {
  e.preventDefault();
  setZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1));
}, { passive: false });

// Pinch zoom for touch devices
let lastDist = null;
infographic.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (lastDist) {
      setZoom(zoom * (dist / lastDist));
    }
    lastDist = dist;
  }
}, { passive: false });
infographic.addEventListener('touchend', () => { lastDist = null; });

// --- Visual & Interactive Enhancements ---
// 1. Planetary Motion Animation: Bobbing
// function animateOrbits(ts) { // THIS IS THE DUPLICATE FUNCTION - Intentionally commented out
//   if (!startTime) startTime = ts;
//   const t = (ts - startTime) / 1000; // seconds
//   nodes.forEach((node, i) => {
//     // Each node orbits at a different speed
//     const speed = 0.12 + 0.04 * i;
//     const angle = nodeAngles[i] * Math.PI / 180 + t * speed;
//     const r = orbitRadii[i % orbitRadii.length];
//     // Bobbing effect
//     const bob = Math.sin(t * 1.2 + i) * 8;
//     const x = centerX + Math.cos(angle) * r;
//     const y = centerY + Math.sin(angle) * r * 0.5 + bob;
//     node.style.left = x + 'px';
//     node.style.top = y + 'px';
//     node.style.transform = 'translate(-50%, -50%)';
//   });
//   // Animate telescope glow
//   const pulse = 1 + 0.08 * Math.sin(t * 2);
//   center.style.transform = `translate(-50%, -50%) scale(${1.2 * pulse})`;
//   requestAnimationFrame(animateOrbits);
// }
// requestAnimationFrame(animateOrbits); // Corresponding call for the duplicate function - Intentionally commented out

// 2. Background: Nebula & Shooting Star
const nebula = document.createElement('div');
nebula.style.position = 'fixed';
nebula.style.left = '0';
nebula.style.top = '0';
nebula.style.width = '100vw';
nebula.style.height = '100vh';
nebula.style.background = 'radial-gradient(ellipse at 70% 30%, #a0bfff44 0%, #0a102600 70%), radial-gradient(ellipse at 20% 80%, #ffe06622 0%, #0a102600 80%)';
nebula.style.zIndex = '0';
document.body.insertBefore(nebula, canvas);

function shootingStar() {
  const star = document.createElement('div');
  star.style.position = 'fixed';
  const randomSize = Math.random() * 3 + 1; // Random width (1px to 4px)
  const randomLength = Math.random() * 100 + 60; // Random tail length (60px to 160px)
  const randomSpeed = Math.random() * 800 + 800; // Random duration (0.8s to 1.6s)

  star.style.width = randomSize + 'px';
  star.style.height = randomLength + 'px';
  star.style.background = 'linear-gradient(180deg, #fff, #ffe06600)';
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.top = (Math.random() * 0.4 + 0.05) * window.innerHeight + 'px'; // Start higher up
  star.style.opacity = '0'; // Start invisible for flash effect
  star.style.zIndex = '3';
  star.style.pointerEvents = 'none';
  document.body.appendChild(star);

  // Initial flash effect
  star.animate([

    { opacity: 0, transform: 'translateY(-20px) scaleY(0.5)' }, // Start slightly above, compressed
    { opacity: 0.9, transform: 'translateY(-10px) scaleY(1)', offset: 0.1 }, // Bright flash, expand
    { opacity: 0.7, transform: 'translateY(0) scaleY(1)', offset: 0.2 } // Settle to normal opacity
  ], { duration: 300, easing: 'ease-out' }).onfinish = () => {
    // Main falling animation after flash
    star.animate([
      { transform: 'translateY(0) scaleY(1)', opacity: 0.7 },
      { transform: `translateY(${120 + Math.random() * 80}px) scaleY(0.3)`, opacity: 0 } // Fall further, shrink more
    ], { duration: randomSpeed, easing: 'ease-in' }).onfinish = () => {
      star.remove();
    };
  };
}
setInterval(() => { if (Math.random() < 0.25) shootingStar(); }, 2000);

// --- Space Emoji Particles ---
const spaceEmojis = ['🌟','🪐','🚀','🌙','👽','🛰️','☄️','🌌','🔭','🛸'];
function spawnEmojiParticle() {
  const emoji = document.createElement('div');
  emoji.textContent = spaceEmojis[Math.floor(Math.random() * spaceEmojis.length)];
  emoji.style.position = 'fixed';
  emoji.style.left = Math.random() * window.innerWidth + 'px';
  emoji.style.top = (Math.random() * 0.8 + 0.05) * window.innerHeight + 'px';
  emoji.style.fontSize = (28 + Math.random() * 22) + 'px';
  emoji.style.opacity = '0.82';
  emoji.style.pointerEvents = 'none';
  emoji.style.zIndex = '2';
  emoji.style.transition = 'transform 2.5s linear, opacity 2.5s linear';
  emoji.style.filter = 'drop-shadow(0 0 8px #ffe06688)';
  document.body.appendChild(emoji);
  // Animate: drift up and fade out, with a little horizontal movement
  const driftX = (Math.random() - 0.5) * 120;
  const driftY = -120 - Math.random() * 80;
  setTimeout(() => {
    emoji.style.transform = `translate(${driftX}px, ${driftY}px) scale(${0.7 + Math.random()*0.6})`;
    emoji.style.opacity = '0';
  }, 60);
  setTimeout(() => emoji.remove(), 2600);
}
// Spawn emoji particles at random intervals (average every 1.5s, but not all at once)
setInterval(() => {
  if (Math.random() < 0.7) spawnEmojiParticle();
}, 1500);

// 3. Planet Hover Effects: Grow, Glow, Tooltip
nodes.forEach((node, i) => {
  node.addEventListener('mouseenter', () => {
    node.style.boxShadow = '0 0 60px 20px #ffe066, 0 0 0 12px #4a90e2';
    node.style.background = 'radial-gradient(circle at 60% 40%, #ffe066 70%, #fff 100%)';
    node.style.color = '#4a90e2';
    // Tooltip
    let tip = document.createElement('div');
    tip.className = 'planet-tooltip';
    tip.textContent = topics[node.dataset.topic]?.title || '';
    document.body.appendChild(tip);
    const rect = node.getBoundingClientRect();
    tip.style.left = (rect.left + rect.width/2 - tip.offsetWidth/2) + 'px';
    tip.style.top = (rect.top - 36) + 'px';
    node._tip = tip;
  });
  node.addEventListener('mouseleave', () => {
    node.style.boxShadow = '';
    node.style.background = '';
    node.style.color = '';
    if (node._tip) { node._tip.remove(); node._tip = null; }
  });
});

// 4. Accessibility: Keyboard navigation & ARIA
nodes.forEach((node, i) => {
  node.setAttribute('tabindex', '0');
  node.setAttribute('role', 'button');
  node.setAttribute('aria-label', topics[node.dataset.topic]?.title || node.textContent);
  node.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      openModal(node.dataset.topic);
    }
  });
});

// 5. Modal Enhancements: Next/Prev arrows
const modalContent = document.querySelector('.modal-content');
const prevBtn = document.createElement('span');
const nextBtn = document.createElement('span');
prevBtn.textContent = '⟨';
nextBtn.textContent = '⟩';
prevBtn.className = 'modal-arrow left';
nextBtn.className = 'modal-arrow right';
modalContent.appendChild(prevBtn);
modalContent.appendChild(nextBtn);
let currentTopicIndex = 0;
function showTopicByIndex(idx) {
  const keys = Object.keys(topics);
  if (idx < 0) idx = keys.length - 1;
  if (idx >= keys.length) idx = 0;
  openModal(keys[idx]);
  currentTopicIndex = idx;
}
prevBtn.onclick = () => showTopicByIndex(currentTopicIndex - 1);
nextBtn.onclick = () => showTopicByIndex(currentTopicIndex + 1);

// 6. Sound Effects
const clickSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7e2.mp3');
nodes.forEach(node => node.addEventListener('click', () => { clickSound.currentTime = 0; clickSound.play(); }));

// 7. Mobile: Reset zoom button
const resetZoomBtn = document.createElement('button');
resetZoomBtn.textContent = 'Zoom zurücksetzen';
resetZoomBtn.className = 'reset-zoom-btn';
resetZoomBtn.style.position = 'fixed';
resetZoomBtn.style.bottom = '24px';
resetZoomBtn.style.right = '24px';
resetZoomBtn.style.zIndex = '20';
resetZoomBtn.style.padding = '0.7em 1.2em';
resetZoomBtn.style.fontSize = '1.1em';
resetZoomBtn.style.background = '#ffe066';
resetZoomBtn.style.border = 'none';
resetZoomBtn.style.borderRadius = '1em';
resetZoomBtn.style.boxShadow = '0 0 12px #ffe06688';
resetZoomBtn.style.cursor = 'pointer';
resetZoomBtn.onclick = () => setZoom(1);
document.body.appendChild(resetZoomBtn);

// 8. Easter egg: secret animation on telescope
let telescopeClicks = 0;
center.addEventListener('click', () => {
  telescopeClicks++;
  if (telescopeClicks === 7) {
    const egg = document.createElement('div');
    egg.textContent = '🌠 Geheimnis entdeckt!';
    egg.style.position = 'fixed';
    egg.style.left = '50%';
    egg.style.top = '30%';
    egg.style.transform = 'translate(-50%, -50%) scale(1.5)';
    egg.style.fontSize = '2.5em';
    egg.style.color = '#ffe066';
    egg.style.textShadow = '0 0 24px #fff, 0 0 8px #4a90e2';
    egg.style.zIndex = '100';
    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), 2500);
    telescopeClicks = 0;
  }
});

// 9. Random fact button
const randomBtn = document.createElement('button');
randomBtn.textContent = 'Zufälliges Thema';
randomBtn.className = 'random-btn';
randomBtn.style.position = 'fixed';
randomBtn.style.bottom = '24px';
randomBtn.style.left = '24px';
randomBtn.style.zIndex = '20';
randomBtn.style.padding = '0.7em 1.2em';
randomBtn.style.fontSize = '1.1em';
randomBtn.style.background = '#b3c6e0';
randomBtn.style.border = 'none';
randomBtn.style.borderRadius = '1em';
randomBtn.style.boxShadow = '0 0 12px #b3c6e088';
randomBtn.style.cursor = 'pointer';
randomBtn.onclick = () => {
  const idx = Math.floor(Math.random() * nodes.length);
  nodes[idx].focus();
  openModal(nodes[idx].dataset.topic);
};
document.body.appendChild(randomBtn);

// --- Quellen (Sources) Button and Modal ---
(function() {
  // Quellen data (add your literature here)
  const quellen = [
    {
      title: 'Bücher & Literatur',
      items: [
        'Hoskin, Michael: The Cambridge Illustrated History of Astronomy. Cambridge University Press, 1997.',
        'King, Henry C.: The History of the Telescope. Dover Publications, 2003.',
        'Kanipe, Jeff: The Cosmic Connection: How Astronomical Events Impact Life on Earth. Prometheus Books, 2009.'
      ]
    },
    {
      title: 'Webseiten',
      items: [
        'NASA: https://www.nasa.gov/mission_pages/hubble/story/index.html',
        'ESA: https://www.esa.int/Science_Exploration/Space_Science/Herschel',
        'Wikipedia: https://de.wikipedia.org/wiki/Teleskop',
        'Max-Planck-Institut für Astronomie: https://www.mpia.de/de/oeffentlichkeit/astronomische-bilder/teleskope',
        'ESO: https://www.eso.org/public/germany/teles-instr/',
        'Typen von Teleskopen: https://www.benel.de/de/beratung/Teleskope'
      ]
    }
  ];

  // Create button
  const quellenBtn = document.createElement('button');
  quellenBtn.textContent = 'Quellen';
  quellenBtn.className = 'quellen-btn';
  quellenBtn.style.position = 'fixed';
  quellenBtn.style.top = '24px'; // Top left
  quellenBtn.style.left = '24px';
  quellenBtn.style.bottom = '';
  quellenBtn.style.right = '';
  quellenBtn.style.zIndex = '1201';
  quellenBtn.style.background = 'radial-gradient(circle at 60% 40%, #ffe066 70%, #fff 100%)';
  quellenBtn.style.color = '#4a90e2';
  quellenBtn.style.fontSize = '1em';
  quellenBtn.style.fontWeight = 'bold';
  quellenBtn.style.border = 'none';
  quellenBtn.style.borderRadius = '1.2em';
  quellenBtn.style.padding = '0.5em 1.3em';
  quellenBtn.style.boxShadow = '0 0 16px 4pxrgba(102, 255, 247, 0.53), 0 0 0 4px #4a90e2';
  quellenBtn.style.cursor = 'pointer';
  quellenBtn.style.opacity = '0.85';
  quellenBtn.style.transition = 'opacity 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s';
  quellenBtn.style.pointerEvents = 'auto';
  quellenBtn.tabIndex = 0;
  quellenBtn.onmouseenter = () => {
    quellenBtn.style.opacity = '1';
    quellenBtn.style.background = 'radial-gradient(circle at 60% 40%, #fffbe6 70%, #ffe066 100%)';
    quellenBtn.style.color = '#1a2238';
    quellenBtn.style.boxShadow = '0 0 32px 8px #ffe066cc, 0 0 0 6px #4a90e2';
  };
  quellenBtn.onmouseleave = () => {
    quellenBtn.style.opacity = '0.85';
    quellenBtn.style.background = 'radial-gradient(circle at 60% 40%, #ffe066 70%, #fff 100%)';
    quellenBtn.style.color = '#4a90e2';
    quellenBtn.style.boxShadow = '0 0 16px 4px #ffe06688, 0 0 0 4px #4a90e2';
  };
  document.body.appendChild(quellenBtn);

  // Create modal (hidden by default)
  const quellenModal = document.createElement('div');
  quellenModal.className = 'quellen-modal hidden';
  quellenModal.style.position = 'fixed';
  quellenModal.style.left = '0';
  quellenModal.style.top = '0';
  quellenModal.style.width = '100vw';
  quellenModal.style.height = '100vh';
  quellenModal.style.background = 'rgba(26,34,56,0.88)';
  quellenModal.style.zIndex = '1300';
  quellenModal.style.display = 'flex';
  quellenModal.style.alignItems = 'center';
  quellenModal.style.justifyContent = 'center';
  quellenModal.style.backdropFilter = 'blur(2px)';
  quellenModal.style.transition = 'opacity 0.3s';
  quellenModal.style.opacity = '0';
  quellenModal.innerHTML = `
    <div class="quellen-content" style="
      background: linear-gradient(135deg, #2e4a3a 60%, #1a2238 100%); /* darker green-blue gradient */
      color: #fff;
      border-radius: 18px;
      box-shadow: 0 0 28px 8px #3ecf4a, 0 0 0 4px #ffe066; /* green and gold shadow */
      padding: 2.5rem 2rem 2rem 2rem;
      min-width: 320px;
      max-width: 500px;
      width: 92vw;
      max-height: 85vh;
      overflow-y: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: none;
      margin: 0;
      animation: modalIn 0.4s cubic-bezier(.34,1.56,.64,1);
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out;
      word-break: break-word;
      white-space: normal;
    ">
      <span class="close-btn" style="position:absolute;top:12px;right:18px;font-size:2rem;color:#ffe066;cursor:pointer;opacity:0.7;z-index:20;transition:opacity 0.2s, transform 0.2s;">&times;</span>
      <h2 style="text-align:center;font-size:2.1rem;color:#ffe066;margin-bottom:1rem;text-shadow:0 2px 8px #000a,0 0 8px #ffe06677;font-weight:800;">Quellen & Literatur</h2>
      <div style="font-size:1.1rem;line-height:1.6;text-align:left;width:100%;color:#eaf6ff;word-break:break-word;white-space:normal;">
        ${quellen.map(q => `<b style='color:#ffe066;'>${q.title}</b><ul style='margin-bottom:1em;padding-left:1.2em;'>${q.items.map(item => `<li style='margin-bottom:0.3em;word-break:break-word;white-space:normal;'>${item}</li>`).join('')}</ul>`).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(quellenModal);
  // Show/hide logic
  quellenBtn.onclick = (e) => {
    e.stopPropagation();
    quellenModal.classList.remove('hidden');
    quellenModal.style.opacity = '1';
    quellenModal.style.pointerEvents = 'auto';
  };
  quellenModal.querySelector('.close-btn').onclick = (e) => {
    e.stopPropagation();
    quellenModal.classList.add('hidden');
    quellenModal.style.opacity = '0';
    quellenModal.style.pointerEvents = 'none';
  };
  quellenModal.onclick = (e) => {
    if (e.target === quellenModal) {
      quellenModal.classList.add('hidden');
      quellenModal.style.opacity = '0';
      quellenModal.style.pointerEvents = 'none';
    }
  };
})();

// --- Enhance Modal Images: Click to Zoom ---
function enhanceModalImages() {
  const modalBody = document.getElementById('modal-body');
  if (!modalBody) return;
  const imgs = modalBody.querySelectorAll('img');
  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.onclick = () => {
      // Get image position and size
      const rect = img.getBoundingClientRect();
      // Create overlay for animation (transparent, no black bg)
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.left = '0';
      overlay.style.top = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.zIndex = '2000';
      overlay.style.pointerEvents = 'auto'; // Allow overlay to receive clicks
      overlay.style.background = 'none';
      overlay.style.opacity = '1';
      overlay.style.transition = 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)';
      document.body.appendChild(overlay);
      // Clone image for animation
      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;
      fullImg.style.position = 'fixed';
      fullImg.style.left = rect.left + 'px';
      fullImg.style.top = rect.top + 'px';
      fullImg.style.width = rect.width + 'px';
      fullImg.style.height = rect.height + 'px';
      fullImg.style.borderRadius = '12px';
      fullImg.style.boxShadow = '0 8px 32px #0002, 0 0 0 2px #ffe066cc';
      fullImg.style.transition = 'all 0.45s cubic-bezier(.34,1.56,.64,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)';
      fullImg.style.cursor = 'zoom-out';
      fullImg.style.objectFit = 'contain';
      fullImg.style.background = '#fff';
      fullImg.style.zIndex = '2001';
      fullImg.style.opacity = '1';
      document.body.appendChild(fullImg);
      setTimeout(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxW = Math.min(vw * 0.92, 700);
        const maxH = Math.min(vh * 0.92, 500);
        fullImg.style.left = (vw/2 - maxW/2) + 'px';
        fullImg.style.top = (vh/2 - maxH/2) + 'px';
        fullImg.style.width = maxW + 'px';
        fullImg.style.height = maxH + 'px';
        fullImg.style.borderRadius = '18px';
        fullImg.style.boxShadow = '0 12px 48px #0003, 0 0 0 4px #ffe066cc';
      }, 10);
      function enableZoomedImageClose(overlay, zoomedImg, originalRect, onClose) {
        function closeZoom() {
          zoomedImg.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)';
          zoomedImg.style.left = originalRect.left + 'px';
          zoomedImg.style.top = originalRect.top + 'px';
          zoomedImg.style.width = originalRect.width + 'px';
          zoomedImg.style.height = originalRect.height + 'px';
          zoomedImg.style.transform = 'none';
          zoomedImg.style.opacity = '0';
          overlay.style.opacity = '0';
          // After animation, remove overlay and image
          setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (zoomedImg.parentNode) zoomedImg.parentNode.removeChild(zoomedImg);
            if (typeof onClose === 'function') onClose();
          }, 400);
        }
        overlay.addEventListener('click', closeZoom);
        zoomedImg.addEventListener('click', closeZoom);
        zoomedImg.addEventListener('click', e => e.stopPropagation());
      }
      enableZoomedImageClose(overlay, fullImg, rect, () => {});
    };
  });
}
const origOpenModal = openModal;
openModal = function(topic, clickedElement) {
  origOpenModal.call(this, topic, clickedElement);
  setTimeout(enhanceModalImages, 10);
};
