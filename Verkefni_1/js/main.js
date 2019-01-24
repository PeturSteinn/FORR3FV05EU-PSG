let logo = Snap.select("#logo"),
  // Parts er það sem er verið að vinna með
  // og vigur sem segir HVAR elementið á að byrja

  // Semsagt element er með orginal pos og þessi vigur segir
  // hver upphafs staðan á að vera frá orginal pos
  parts = [
    ["green", [-14, 4]],
    ["blue", [11, 7]],
    ["darkblue", [-16, -9]],
    ["yellow", [-20, 5]],
    ["red", [12, 17]],
    ["name", [0, 30]]
  ],
  i = 0, // Teljari
  showTimer = null,
  hideTimer = null

// Function sem keyrir þegar birta skal öll elementin
showEach = () => {
  // Sjá til þess að timeout fyrir að fela elementin trufli ekki, það má
  // ekki vera enþá eitthvað timeout þegar þú ætlar að birta elementin
  clearTimeout(hideTimer);
  if (i >= parts.length) return; // Ef búið er að sýna öll elementin hættum við
  // Náum í "Snap" elementið og vinnum með animate fallið
  // Setjum hvað skal gera í object ({...}),
  // hvað það á að taka langann tíma (200),
  // hvernig hegðunin á animationinu á að vera (mina.easout)
  parts[i][2].animate({
    transform: "t0,0",
    opacity: 1
  }, 200, mina.easeout);
  // Þegar búið er að sýna eitt element, keyrum við fallið aftur eftir 200ms (og sýnum þá það næsta)
  showTimer = setTimeout(showEach, 200);
  i++; // Hækkum teljarann sem telur elements sem eru sýnileg
  // Ef teljarinn er orðinn hærri en númer af elements,
  // þá lögum við hann og breytum honum í fjölda elementa
  if (i >= parts.length) i = parts.length - 1;
};

// Function sem keyrir þegar fela skal öll elementin
hideEach = () => {
  // Sjá til þess að timeout fyrir að sýna elementin trufli ekki, það má
  // ekki vera enþá eitthvað timeout þegar þú ætlar að fela elementin
  clearTimeout(showTimer);
  if (i < 0) return; // Ef búið er að fela öll elementin hættum við
  parts[i][2].animate({
    transform: "t" + parts[i][1],
    opacity: 0
  }, 200, mina.easeout);
  // Þegar búið er að fela eitt element, keyrum við fallið aftur eftir 200ms (og felum þá það næsta)
  hideTimer = setTimeout(hideEach, 200);
  i--; // Minnkum teljarann sem telur elements sem eru sýnileg
  if (i < 0) i = 0; // Ef counterinn er kominn undir fyrir 0, þá resetum við hann á 0
};

// Safnað saman þeim elements sem við ætlum að vinna með, byrja á því að gera þau
// ósýnileg og færa þau á viðeigandi staði.
parts.forEach((part, index) => {
  let element = logo.select("#" + part[0]);
  element.attr({
    opacity: 0,
    transform: "t" + part[1]
  });
  parts[index].push(element);
});

i = 0; // Teljari fyrir fjölda elements sem eru currently sýnileg

// Init
setTimeout(() => {
  logo.attr({
    display: "inline"
  });
  showEach();
}, 100);

logo.hover(hideEach, showEach); // Þegar er hoverað keyrir viðeigandi fall