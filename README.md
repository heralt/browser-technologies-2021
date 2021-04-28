# Browser Technologies @cmda-minor-web 20-21

//Robuuste, toegankelijke websites ontwerpen en maken …

Één van de mooiste [principes](https://www.w3.org/DesignIssues/Principles.html) van het web is dat iedereen met een computer en een browser het web kan gebruik. [Het web is voor iedereen](https://www.youtube.com/watch?v=UMNFehJIi0E). Het is geen gecontroleerde (programmeer) omgeving, je kan er gerust van uit gaan dat niemand precies hetzelfde te zien krijgt als wat jij in je browser ziet. Er zijn technische beperkingen, zoals afmetingen van de browser, grootte van het apparaat, manier van interactie, kwaliteit van de hardware, kwaliteit van het netwerk en er zijn mensen, allemaal verschillende mensen ...

In het vak Browser Technologies gaan we onderzoeken wat Progressive Enhancement is en hoe je dit kan toepassen om goede, robuuste, toegankelijke websites te maken. Voor iedereen. Het web is voor iedereen, in dit vak leer je hoe je daarvoor kan zorgen.

### Opdracht 1 🛹 NPM install Progressive- enhancement
Woensdag had ik met mijn team gekeken naar een goed metafoor om prograssive enhancement uit te leggen. Hiervoor zijn we uitgekomen bij een hotdog. Hierbij waren de het broodje en vlees de core elementen, en alles extra een enhancement.<br>
We hadden ook snel een site gemaakt om ons voorbeeld te visualizeren, hier is het voorbeeld te zien: [Hotdog metafoor](https://pe-xi.vercel.app/)

### Opdracht 2 💔 Breek het Web
Donderdag moest ik het web breken op twee verschillende manieren. De rede hiervoor was, om erachter te komen wat er gebeurt in browsers als bepaalde functionaliteiten niet ondersteund worden. Ik heb gekozen voor afbeeldingen uitzetten en slecht internet. 

Ik heb twee korte verslagen geschreven en die zijn hier te vinden:
- [breedband](https://github.com/sjagoori/pe/wiki/Breek-het-web---heralt---Breedband)
- [afbeeldingen](https://github.com/sjagoori/pe/wiki/Afbeeldingen--uitzetten----heralt)

### De eindopdracht ✨ Progressive Enhanced Browser Technologie
Voor de browser tech eind opdracht, heb ik ervoor gekozen om een album site te maken. Hiervoor had ik eerst een paar simpele designs getekend, daarna een paar keer aangepast om het gebruik van de site iets te versimpelen en daarna ben ik begonnen met het creëren van de site.
- [Wireflows](https://github.com/heralt/browser-technologies-2021/wiki/browser-wireflow)

### Album app<br>
![Prototype image](https://github.com/heralt/browser-technologies-2021/blob/master/project%20utils/homescreen.png?raw=true)
Link: [Album app](https://btalbum.herokuapp.com/)

## Site opbouw
Tijdens het creëren van de site heb ik de progressive enhancement manier van web development toegepast. Dit betekent dat je de development van jouw site opdeelt in 3 tot 4 delen. Je begint bij de core laag, en doet daar steeds een enhancement laag bovenop. Reden hiervoor is, dat als alle enhancement lagen wegvallen, de core laag het nog steeds blijft doen.<br>

### Functional/reliable 
Deze laag bestaat uit alle functionaliteiten die in de core van jouw systeem zijn. Deze moeten dus altijd werken, ook als een gebruiker geen javascript of css kan of wil gebruiken. 

Mijn gekozen core functionaliteiten van album app zijn: 
- Album creëren
- fotos toevoegen
- meta-data kunnen toevoegen aan image

### Usable
In de useable laag wordt er css toegevoegd aan de site. Nu zet je alles wat je in de eerste laag hebt gebouwd op de goede plek. En kijk je wat er gebeurt als je de scherm size verandert, en hoe je dat kan afvangen en nog steeds je site mooi houdt.

In deze laag heb ik de heb ik de indeling van de site verbeterd. Ook heb ik in deze laag toegevoegd dat de slideshow zonder javascript snapped op foto's en dat de indeling van de site wordt verandert als het scherm kleiner wordt. 

### Pleasurable 
Deze laag voeg je de nieuwste css en javascript toe aan je site. Dit krijgen gebruikers te zien als hun browsers alle features van css en javascript ondersteund.

In deze laag heb een drag n drop functie en slideshow gebouwd. Deze functies horen bij de pleasurable laag, omdat ze bestaan uit client-side javascript. Dit kan bij sommige mensen uitstaan of niet goed ondersteund worden, dus zijn de slideshow en drag n drop toegevoegd in de laatste laag van mijn site. 

## Testen in browsers
<details>
<summary>Chrome</summary>
In de Chrome web browser werkt de app perfect. Dit komt omdat ik de Chrome browser gebruikte tijdens het developen van de site.
</details>

<details>
<summary>Edge</summary>
In de Edge browser werkt de site ook als normaal, er zijn maar een paar kleine verschillen met de Chrome browser. 
  <ul>
  <li>In de Edge browser zijn de javascript slideshow knoppen over de plaatjes heen, inplaats van naast de plaatjes.
  <li>Ook werkt de slideshow die geen javascript gebruikt beter in de Edge browser dan in de Chrome browser. Je kan in de Edge browser de pijlen knoppen gebruiken om van afbeelding te wisselen. In de Chrome browser werkt dit niet goed.
  </ul>
  <img src="https://github.com/heralt/browser-technologies-2021/blob/master/project%20utils/edge%20slideshow.png?raw=true" alt="js pijlen">
</details>

<details>
<summary>Iphone safari</summary>
in Safari werkt de app goed. Omdat ik kleine schermen afvang in mijn css code, blijft de app er ook goed uitzien. Verder werkt alles naar behoren. Het enige waar ik een verbeter punt zie, is dat de afbeeldingen in het meta scherm wat kleiner zouden kunnen.
  <br>
  <img src="https://github.com/heralt/browser-technologies-2021/blob/master/project%20utils/iphone%20meta.png?raw=true" alt="Ihpone meta scherm">
</details>

<details>
<summary>Android</summary>
  In de android browser werkt de app het slechtst. Als je op de home pagina op de afbeeldingen naar beneden scrolt, zien de toegevoegde plaatjes er heel vreemd uit. Ze zijn samengedrukt en niet de goede maat.<br> 
  <img src="https://github.com/heralt/browser-technologies-2021/blob/master/project%20utils/adroid(2).jpg?raw=true" alt="Ihpone meta scherm" width="400vw">
  <br>
  Ook overlappen de afbeeldingen elkaar, in het album creëer scherm.
  <br>
  <img src="https://github.com/heralt/browser-technologies-2021/blob/master/project%20utils/android(2).jpg?raw=true" alt="Ihpone meta scherm" width="400vw">
</details>
