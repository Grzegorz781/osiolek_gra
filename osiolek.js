
function getPrzyslowie(){
	const linie = przyslowia.split(/\r?\n/).filter(linia => linia.trim() !== '');
	const losowyIndex = Math.floor(Math.random() * linie.length);
	return linie[losowyIndex];
}


var haslo = "Bez pracy nie ma kołaczy";
haslo = "Ala ma kota, a kot ma Alę!";
haslo = getPrzyslowie();
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var ile_skuch = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var fanfara = new Audio("fanfara.wav")
var osiol = new Audio("osiol_rzenie.mp3")



function zagrajFanfare() {
    let licznik = 0;
    const maxPowtorzen = 3;
    fanfara.currentTime = 0;
    fanfara.play();
    	// Nasłuchiwanie końca odtwarzania
    fanfara.addEventListener('ended', function() {
    licznik++;
    if (licznik < maxPowtorzen) {
        fanfara.play(); // Zagraj ponownie, jeśli nie minęły 3 razy
        }
    });
}




var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";


// Pierwsce uruchomienie
//zagrajFanfare();


var haslo1 = "";

for (i=0; i<dlugosc; i++)
{
	//if (haslo.charAt(i)==" "|haslo.charAt(i)==","|haslo.charAt(i)==";"|haslo.charAt(i)=="("|haslo.charAt(i)==")"|haslo.charAt(i)=="-"|haslo.charAt(i)=="."|haslo.charAt(i)=="?"|haslo.charAt(i)=="!"|(haslo.charAt(i) >= '0' && haslo.charAt(i) <= '9')) haslo1 = haslo1 + haslo.charAt(i);
	//else haslo1 = haslo1 + "_";
	if (litery.includes(haslo.charAt(i))) haslo1 = haslo1 + "_";
	else haslo1 = haslo1 + haslo.charAt(i);

}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

function znajdzNrLitery(klawisz)
{
	if (!klawisz) return null;
	
	const litera = klawisz.toUpperCase();
	const mapa = {
		'A': 0, 'Ą': 1, 'B': 2, 'C': 3, 'Ć': 4, 'D': 5, 'E': 6, 'Ę': 7,
		'F': 8, 'G': 9, 'H': 10, 'I': 11, 'J': 12, 'K': 13, 'L': 14, 'Ł': 15,
		'M': 16, 'N': 17, 'Ń': 18, 'O': 19, 'Ó': 20, 'P': 21, 'Q': 22, 'R': 23,
		'S': 24, 'Ś': 25, 'T': 26, 'U': 27, 'V': 28, 'W': 29, 'X': 30, 'Y': 31,
		'Z': 32, 'Ż': 33, 'Ź': 34
	};
	
	return mapa[litera] !== undefined ? mapa[litera] : null;
}

function obsluzKlawisz(event)
{
	if (event.repeat) return;
	
	const nr = znajdzNrLitery(event.key);
	if (nr === null) return;
	
	event.preventDefault();
	sprawdz(nr);
}

function start()
{
	
	var tresc_diva ="";
	
	for (i=0; i<=34; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		//if ((i+1) % 7 ==0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	document.addEventListener("keydown", obsluzKlawisz);
	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}


function sprawdz(nr)
{
	var element = "lit" + nr;
	var przycisk = document.getElementById(element);
	
	if (!przycisk || przycisk.getAttribute("onclick") === ";") return;
	
	var trafiona = false;
	
	for(i=0; i<dlugosc; i++)
	{
		if (haslo.charAt(i) == litery[nr]) 
		{
			haslo1 = haslo1.ustawZnak(i,litery[nr]);
			trafiona = true;
		}
	}
	
	if(trafiona == true)
	{
		yes.play();
		przycisk.style.background = "#003300";
		przycisk.style.color = "#00C000";
		przycisk.style.border = "clamp(0.1rem, 0.4vw, 0.2rem) solid #00C000";
		przycisk.style.cursor = "default";
		przycisk.setAttribute("onclick",";");
		
		wypisz_haslo();
	}
	else
	{
		no.play();
		przycisk.style.background = "#330000";
		przycisk.style.color = "#C00000";
		przycisk.style.border = "clamp(0.1rem, 0.4vw, 0.2rem) solid #C00000";
		przycisk.style.cursor = "default";	
		przycisk.setAttribute("onclick",";");		
		
		//skucha
		ile_skuch++;
		var obraz = "img/s"+ ile_skuch + ".jpg";
		document.getElementById("osiolek").innerHTML = '<img src="'+obraz+'" alt="" />';
	}
	
	//wygrana
	if (haslo == haslo1){
	document.getElementById("alfabet").innerHTML  = 'Brawo! Podano prawidłowe hasło! <br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	zagrajFanfare();

	}
	//przegrana
	if (ile_skuch>=9){
	document.getElementById("alfabet").innerHTML  = 'Buu! Prawidłowe hasło:<br />'+haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	osiol.play();
	}
}