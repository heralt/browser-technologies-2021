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
Voor de browsertech eind opdracht, heb ik ervoor gekozen om een album site te maken. Hiervoor had ik eerst een paar simpele designs getekend, een paar keer aangepast om het gebruik van de site iets te versimpelen en daarna ben ik begonnen met het creëren van de site.
- [Wireflows](https://github.com/heralt/browser-technologies-2021/wiki/browser-wireflow)

### Demo link:<br>
[Album app](https://btalbum.herokuapp.com/)

## Site opbouw
Tijdens het creëren van de site heb ik de progressive enhancement manier van web development toegepast. Dit betekent dat je de development van jouw site opdeelt in 3 tot 4 delen. Je begint bij de core laag, en doet daar steeds een enhancement laag bovenop. Reden hiervoor, is dat als alle enhancement lagen wegvallen, de core laag het nog steeds blijft doen.<br>

### Functional/reliable 
Deze laag bestaat uit alle functionaliteiten die in de core van jouw systeem zijn. Dit zijn functies die altijd zouden moeten werken, ook als een gebruiker geen javascript of css kan of wil gebruiken.

Mijn gekozen core functionaliteiten van album app zijn: 
- Album creëren
- fotos toevoegen
- meta-data kunnen toevoegen aan image

### Usable
In de useable laag wordt er css toegevoegd aan de site. Nu zet je alles wat je in de eerste laag hebt gebouwd op de goede plek. En kijk je wat er gebeurt als je de scherm size verandert, en hoe je dat kan afvangen en nog steeds je site mooi houdt.

In deze laag heb ik de heb ik de indeling van de site verbeterd. Ook heb ik in deze laag toegevoegd dat de slideshow zonder javascript snapped op foto's en dat de indeling van de site wordt verandert als het scherm kleiner wordt. 

### Pleasurable 
Deze laag voeg je de nieuwste css en javascript toe je site. Dit krijgen gebruikers te zien, die css en javascript volledig kunnen gebruiken. 

In deze laag heb een drag n drop functie en slideshow gebouwd. 
