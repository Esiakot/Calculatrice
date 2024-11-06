function calculatrice() {
  // Variables globales
  let valeurEntree = "";
  let tableauAffichageValeurs = [];
  let tableauCalculValeurs = [];
  let rep = 0;
  let expression = "";
  let resultat = 0;
  let modeUniquementNombre = 0;
  const caracteresDisponibles = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "/",
    "-",
    "(",
    ")",
    "|",
    "^",
  ];

  // Fonction d'insertion du résultat dans l'interface
  const insererResultat = (resultat) => {
    document.querySelector("#resultat").innerHTML = "= ";
    document
      .querySelector("#resultat")
      .insertAdjacentHTML("beforeend", `${resultat}`);
  };

  // Mise à jour de l'affichage
  const mettreAJourAffichage = () => {
    if (
      tableauCalculValeurs[tableauCalculValeurs.length - 2] === "*" &&
      tableauCalculValeurs[tableauCalculValeurs.length - 1] === "*"
    ) {
      tableauAffichageValeurs.splice(-2, 2, "^");
      tableauCalculValeurs.splice(-2, 2, "**");
    }
    document.querySelector("#affichage").innerHTML =
      tableauAffichageValeurs.join("");
  };

  // Vérifie si le mode EXP est activé pour insérer l'exposant
  const modeEXP = (e) => {
    if (
      !["btn-nombre", "btn-point", "btn-supprimer", "btn-signe"].includes(
        e.target.classList[1]
      )
    ) {
      if (modeUniquementNombre === 1) {
        tableauCalculValeurs.push("*1)");
        tableauAffichageValeurs.push("</sup>");
        modeUniquementNombre = 0;
      }
    }
  };

  // Calcul de l'expression avec gestion des erreurs
  const calculer = (expression) => {
    try {
      resultat = eval(expression);
      rep = resultat;
    } catch (error) {
      resultat = "Erreur";
    }
    return resultat;
  };

  // Changer le signe (+/-) d'un nombre
  const changerSigne = () => {
    let index = tableauCalculValeurs.length - 1;
    while (
      tableauCalculValeurs[index] === "." ||
      typeof tableauCalculValeurs[index] === "number"
    ) {
      index--;
    }
    if (
      tableauCalculValeurs[index] !== "-" &&
      tableauCalculValeurs[index] !== "+"
    ) {
      tableauCalculValeurs.splice(index + 1, 0, "-");
      tableauAffichageValeurs.splice(index + 1, 0, "-");
    } else if (tableauCalculValeurs[index] === "-") {
      tableauCalculValeurs[index] = "+";
      tableauAffichageValeurs[index] = "+";
    } else {
      tableauCalculValeurs[index] = "-";
      tableauAffichageValeurs[index] = "-";
    }
    mettreAJourAffichage();
  };

  // Ajout d'un écouteur sur les boutons
  document.querySelector("#boutons").addEventListener("click", (e) => {
    const classList = e.target.classList;
    if (classList.contains("btn-nombre")) {
      tableauCalculValeurs.push(e.target.innerText * 1);
      tableauAffichageValeurs.push(e.target.innerText * 1);
    } else if (classList.contains("btn-signe")) {
      changerSigne();
    } else if (classList.contains("btn-point")) {
      tableauCalculValeurs.push(".");
      tableauAffichageValeurs.push(".");
    }

    modeEXP(e);

    // Traitement des boutons spéciaux
    if (classList.contains("btn-special") && !classList.contains("btn-rien")) {
      tableauAffichageValeurs.push(e.target.innerText);
      const specClass = classList[2];

      if (specClass === "btn-alg") {
        tableauCalculValeurs.push(`Math.${classList[3]}(`);
        tableauAffichageValeurs.push("(");
      } else if (specClass === "btn-mult") {
        tableauCalculValeurs.push("*");
      } else if (specClass === "btn-racine") {
        tableauCalculValeurs.push("Math.sqrt(");
        tableauAffichageValeurs.push("(");
      } else if (specClass === "btn-PI") {
        tableauCalculValeurs.push("Math.PI");
        tableauAffichageValeurs.push("");
      } else if (specClass === "btn-E") {
        tableauCalculValeurs.push("Math.E");
        tableauAffichageValeurs.push("");
      } else if (specClass === "btn-%") {
        tableauCalculValeurs.push("/100");
      } else if (specClass === "asin") {
        tableauCalculValeurs.push("Math.asin(");
        tableauAffichageValeurs.push("asin(");
      } else if (specClass === "acos") {
        tableauCalculValeurs.push("Math.acos(");
        tableauAffichageValeurs.push("acos(");
      } else if (specClass === "atan") {
        tableauCalculValeurs.push("Math.atan(");
        tableauAffichageValeurs.push("atan(");
      } else {
        tableauCalculValeurs.push(e.target.innerText);
      }

      // Gestion des boutons de puissances et autres
    } else if (classList.contains("btn-EXP")) {
      tableauCalculValeurs.push("*10**(1*");
      tableauAffichageValeurs.push("x10<sup>");
      modeUniquementNombre = 1;
    } else if (classList.contains("btn-exp1")) {
      tableauCalculValeurs.push("**(-1)");
      tableauAffichageValeurs.push("⁻¹");
    } else if (classList.contains("btn-exp2")) {
      tableauCalculValeurs.push("**(2)");
      tableauAffichageValeurs.push("²");
    } else if (classList.contains("btn-exp3")) {
      tableauCalculValeurs.push("**(3)");
      tableauAffichageValeurs.push("³");
    } else if (classList.contains("btn-puissance")) {
      tableauCalculValeurs.push("**");
      tableauAffichageValeurs.push("^");
    } else if (classList.contains("btn-Rep")) {
      tableauCalculValeurs.push(rep);
      tableauAffichageValeurs.push("Rep");
    }

    mettreAJourAffichage();
  });

  // Écoute des touches du clavier
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Escape") document.querySelector("#btn-AC").click();
    else if (e.key === "Enter") document.querySelector("#btn-egale").click();
    else if (e.key === "Backspace") document.querySelector("#Suppr").click();
    else if (e.key === "*") document.querySelector(".btn-mult").click();
    else if (caracteresDisponibles.includes(e.key)) {
      tableauCalculValeurs.push(e.key * 1 || e.key);
      tableauAffichageValeurs.push(e.key * 1 || e.key);
    }
    mettreAJourAffichage();
  });

  // Efface l'affichage
  document.querySelector("#btn-AC").addEventListener("click", () => {
    tableauCalculValeurs = [];
    tableauAffichageValeurs = [];
    document.querySelector("#affichage").innerHTML = "";
    document.querySelector("#resultat").innerHTML = "=";
  });

  // Suppression du dernier élément
  document.querySelector("#Suppr").addEventListener("click", () => {
    tableauCalculValeurs.pop();
    tableauAffichageValeurs.pop();
    mettreAJourAffichage();
  });

  // Calcul et affichage du résultat lors de la pression de "Égal"
  document.querySelector("#btn-egale").addEventListener("click", (e) => {
    modeEXP(e);
    expression = tableauCalculValeurs.join("");
    insererResultat(calculer(expression));
  });
}

calculatrice();
