/********* 
Making the pop-up infor card for Pokemon
*********/

export function makeInfoCard() {
    const infoCard = document.createElement("section");

    const idArticle = document.createElement("article");
    const popID = document.createElement("p");
    popID.textContent = '';
    const popName = document.createElement("p");
    popName.textContent = '';
    const popImg = document.createElement("img");
    popImg.src = '';
    idArticle.append(popID, popName, popImg);

    const baseArticle = document.createElement("article");
    const popType = document.createElement("p");
    popType.textContent = '';
    const popCategory = document.createElement("p");
    popCategory.textContent = '';
    const popHeight = document.createElement("p");
    popHeight.textContent = '';
    const popWeight = document.createElement("p");
    popWeight.textContent = '';
    const popAbilities = document.createElement("p");
    popAbilities.textContent = '';
    baseArticle.append(popType, popCategory, popHeight, popWeight, popAbilities);

    const statsArticle = document.createElement("article");
    const statsHeading = document.createElement("p");
    statsHeading.textContent = "STATS";
    const popHP = document.createElement("p");
    popHP.textContent = '';
    const popAtk = document.createElement("p");
    popAtk.textContent = '';
    const popDef = document.createElement("p");
    popDef.textContent = '';
    const popSpeed = document.createElement("p");
    popSpeed.textContent = '';
    const popSpAtk = document.createElement("p");
    popSpAtk.textContent = '';
    const popSpDef = document.createElement("p");
    popSpDef.textContent = '';
    statsArticle.append(statsHeading, popHP, popAtk, popDef, popSpeed, popSpAtk, popSpDef);

    const movesArticle = document.createElement("article");
    const popMoves = document.createElement("p");
    popMoves.textContent = '';
    movesArticle.append(popMoves);

    infoCard.append(idArticle, baseArticle, statsArticle, movesArticle);
};