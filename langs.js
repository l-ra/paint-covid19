let s = {
  paintCovid19: {
    en: "Paint COVID-19",
    cs: "Vybarvi COVID-19",
  },
  explainSite: {
    en: `COVID-19 gene sequence consists of 29903 gene "letters" (ATCG). 
        Here you can assign each letter a color and paint the virus code 
        as an image. You can even send the virus to a friend of foe.`,
    cs: `Genová sekvence viru COVID-19 se skládá z pouhých 29903 genetických "písmen" (ACTG).
        zde můžete každému písmenu přiřadit barvu a vybarvit si tak kód viru jako omalovánky.
        Vybarvený virus pak můžete zaslat jak příteli, tak nepříteli.`,
  },
  randomColors: {
    en: `Random colors`,
    cs: `Náhodné barvy`,
  },
  sequenceSource: {
    en: `Sequence source `,
    cs: `Zdroj sekvence `,
  },
  downloadShare:{
    en: `Download & Share`,
    cs: `Stahnout & Sdílet`,
  },
  lang: {
    en: `${navigator.language || navigator.userLanguage}`,    
  }
};

function doTranslate(context) {
  try {
    //console.log(context);
    let lang = navigator.language || navigator.userLanguage;
    const langMatch=/([..])(-[..])?/.exec(lang)
    if (langMatch){
        lang=langMatch[1]
    } else {
        lang='en'
    }
    //console.log(`lang: ${lang}`);
    if (context == null) doTranslate(document.querySelector("html"));
    else {
      context.childNodes.forEach((node) => {
        switch (node.nodeType) {
          case 1:
            doTranslate(node);
            break;
          case 3:
            //console.log(`translating: ${node.textContent}`);
            const match = /^\{\{(.*)\}\}$/.exec(node.textContent);
            if (match){
                const id=match[1]
                if (s[id]) {
                    if (s[id][lang]){
                        node.textContent = s[id][lang];
                    } else {
                        node.textContent = s[id]['en'];
                    }
                }
            } 
            break;
        }
      });
    }
  } catch (err) {
    console.error("while translating", err);
  }
}
