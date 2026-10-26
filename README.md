# javascript-paintpage

# Kotkantien maalaus- ja tapetointi

Maalaus- ja tapetointiyrityksen esittelysivusto. Sivustolla voi tutustua palveluihin ja töihin, pyytää tarjouksen ja kokeilla eri seinävärejä huoneen kuvassa.

Sivusto on tehty HTML:llä, [Bootstrap 5](https://getbootstrap.com/):llä ja JavaScriptillä. Palvelinta tai tietokantaa ei tarvita.

## Sivut

| Sivu | Tiedosto | Sisältö |
| --- | --- | --- |
| Etusivu | `index.html` | Yrityksen esittely |
| Palvelut | `Palvelut.html` | Palvelukortit ja työn kulku |
| Galleria | `Galleria.html` | Kuvagalleria suodattimilla ja kuvan suurennuksella |
| Yhteystiedot | `Yhteystiedot.html` | Tarjouspyyntölomake ja yhteystiedot |
| Värientestaus | `Värientestaus.html` | Seinän värin testaus huoneen kuvassa |

## Ominaisuudet

- **Värientestaus:** valitse seinälle väri valmiista sävyistä tai värinvalitsimella, syötä oma heksakoodi ja säädä vaaleutta. Sivu näyttää värin nimen sekä HEX-, RGB- ja HSL-arvot, ja värikoodin voi kopioida leikepöydälle.
- **Galleria:** kuvat voi suodattaa työtyypin mukaan (sisämaalaus, tapetointi, ulkomaalaus), ja kuvaa napsauttamalla se aukeaa isompana.
- **Tarjouspyyntölomake:** lomake tarkistaa kentät ja avaa käyttäjän sähköpostiohjelman valmiiksi täytetyllä viestillä.
- **Tumma ja vaalea teema:** sivusto seuraa laitteen teema-asetusta (`prefers-color-scheme`).
- **Responsiivisuus:** asettelu mukautuu tietokoneen, tabletin ja puhelimen näyttöön.

## Kansiorakenne

```
javascript-paintpage/
├── html/
│   ├── index.html
│   ├── Palvelut.html
│   ├── Galleria.html
│   ├── Yhteystiedot.html
│   └── Värientestaus.html
├── kuvat/
│   ├── kotkatielogo.png
│   └── galleria1.jpg … galleria6.jpg
└── README.md
```

Sivujen polut ovat suhteellisia (esimerkiksi `../kuvat/kotkatielogo.png`), joten `html`- ja `kuvat`-kansioiden pitää olla vierekkäin.

## Käyttöönotto

### Vaihtoehto 1: avaa selaimessa

Avaa haluamasi HTML-tiedosto kaksoisnapsauttamalla sitä. Bootstrap ladataan CDN-palvelusta, joten tarvitset internetyhteyden.

### Vaihtoehto 2: paikallinen palvelin

Asenna [Node.js](https://nodejs.org/) ja aja projektin kansiossa:

```bash
npx live-server .
```

Sivu avautuu osoitteeseen `http://127.0.0.1:8080`, ja se päivittyy automaattisesti, kun tallennat muutoksen. Vaihtoehtoisesti voit käyttää VS Coden Live Server -lisäosaa.

> **Windows PowerShell:** jos `npx` antaa virheen `running scripts is disabled`, aja kerran `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` tai käytä komentoa `npx.cmd live-server .`.

## Sisällön muokkaaminen

- **Yhteystiedot:** vaihda puhelinnumero, osoite ja aukioloajat tiedostossa `Yhteystiedot.html`. Vaihda sähköpostiosoite sekä `Yhteystiedot.html`:n `mailto:`-linkkiin että lomakkeen skriptiin.
- **Galleria:** lisää omat kuvat kansioon `kuvat` ja vaihda niiden tiedostonimet sekä kuvatekstit `Galleria.html`:ään. Jos kuvaa ei löydy, sivu näyttää värillisen paikkamerkin.
- **Palvelut:** muokkaa kortteja suoraan `Palvelut.html`:ssä.
- **Väritesterin sävyt:** muokkaa `PRESETS`-taulukkoa tiedoston `Värientestaus.html` skriptissä. Jokaisella sävyllä on nimi ja heksakoodi.
- **Väritesterin koot:** `--tester-max` rajoittaa koko osion ja `--room-max` huonekuvan enimmäisleveyttä.

## Tunnetut rajoitukset

- Tarjouslomake käyttää `mailto:`-linkkiä, joten se toimii vain, jos käyttäjällä on sähköpostiohjelma. Viestin automaattiseen lähettämiseen tarvitaan palvelin tai lomakepalvelu.
- Huoneen kuva on SVG-piirros. Sen väri vaihtuu vain seinän osalta.
- Sivut käyttävät Bootstrapia CDN-palvelusta, eivätkä ne toimi ilman verkkoyhteyttä, ellet lataa Bootstrapia paikallisesti.

## Teknologiat

- HTML5, CSS3 ja JavaScript (ES6)
- [Bootstrap 5.3.3](https://getbootstrap.com/)

## Tekijä

Rico viitavaara