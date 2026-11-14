console.log("Script cargado correctamente.");
/* ==========================================================================
   script.js — De la Utopía a las Armas
   --------------------------------------------------------------------------
   1. Mensaje de carga (original)
   2. Menú fijo
   3. Mapa mental: CONTENIDO (aquí se editan los textos)
   4. Mapa mental: FUNCIONAMIENTO (generación, líneas, zoom, niveles, fichas)
   ========================================================================== */

console.log("Script cargado correctamente.");


/* ==========================================================================
   2. MENÚ FIJO
   - Fondo sólido al bajar por la página.
   - Menú desplegable (hamburguesa) en celulares.
   - Resalta la sección que se está viendo.
   ========================================================================== */
(function iniciarMenuFijo() {
  const nav = document.getElementById('nav-principal');
  if (!nav) return;

  const toggle = document.getElementById('nav-toggle');
  const lista = document.getElementById('nav-enlaces');
  const enlaces = Array.from(nav.querySelectorAll('.nav-enlace'));

  function actualizarFondo() {
    const menuAbierto = lista.classList.contains('abierto');
    nav.classList.toggle('con-fondo', window.scrollY > 40 || menuAbierto);
  }

  function cerrarMenu() {
    lista.classList.remove('abierto');
    toggle.classList.remove('abierto');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    actualizarFondo();
  }

  toggle.addEventListener('click', function () {
    const abierto = lista.classList.toggle('abierto');
    toggle.classList.toggle('abierto', abierto);
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    actualizarFondo();
  });

  enlaces.forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarMenu();
  });

  window.addEventListener('scroll', actualizarFondo, { passive: true });
  actualizarFondo();

  // Resaltar en el menú la sección visible
  const secciones = enlaces
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        const id = '#' + entrada.target.id;
        enlaces.forEach(function (a) {
          a.classList.toggle('activo', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secciones.forEach(function (s) { observador.observe(s); });
  }
})();


/* ==========================================================================
   3. MAPA MENTAL — CONTENIDO
   --------------------------------------------------------------------------
   Para editar textos solo hay que cambiar este objeto.
   - grupo(título, [hijos])   → nodo que se expande.
   - hoja(título, ficha)      → concepto final que abre una tarjeta.
     ficha = { texto, fechas: [[fecha, descripción], …], personajes: [...],
               fuentes: [...],     ← opcional: citas breves (APA) que se muestran en la tarjeta
               imagenes: [...] }   ← opcional: caja de imágenes, ver función img()
   ========================================================================== */
function grupo(titulo, hijos) {
  return { titulo: titulo, hijos: hijos };
}

function hoja(titulo, ficha) {
  return { titulo: titulo, ficha: ficha, hijos: [] };
}

/* Imágenes de Wikimedia Commons (dominio público).
   img(nombreDelArchivo, pie) → objeto que la tarjeta muestra en la caja de imágenes.
   Para usar una imagen propia: { src: 'img/mi-foto.jpg', pie: 'Descripción', credito: 'Autor' } */
function img(archivo, pie) {
  return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(archivo) + '?width=900',
    enlace: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(archivo),
    pie: pie,
    credito: 'Wikimedia Commons (dominio público)'
  };
}

const DATOS_MAPA = {
  titulo: 'Utopías sociales, socialismo, comunismo y Revolución Rusa',
  hijos: [

    /* ------------------------------------------------------------------
       RAMA 1: SOCIALISMO Y COMUNISMO (lado izquierdo, dorado)
       ------------------------------------------------------------------ */
    {
      titulo: 'Socialismo y comunismo',
      color: '#c99700',
      colorTexto: '#0f1115',
      lado: -1,
      hijos: [
        grupo('Socialismo utópico y científico', [
          hoja('Socialismo utópico', {
            texto: 'Primera corriente socialista, surgida a inicios del siglo XIX. Sus pensadores denunciaron la miseria obrera de la Revolución Industrial y propusieron comunidades ideales basadas en la cooperación. Confiaban en el ejemplo y en la buena voluntad, no en la lucha política.',
            fechas: [
              ['1800', 'Robert Owen dirige la fábrica modelo de New Lanark (Escocia).'],
              ['1822', 'Charles Fourier expone su modelo de comunidad: el falansterio.'],
              ['1825', 'Owen funda la comunidad de New Harmony (Estados Unidos).']
            ],
            personajes: ['Henri de Saint-Simon', 'Charles Fourier', 'Robert Owen']
          }),
          hoja('Socialismo científico', {
            texto: 'Nombre que Marx y Engels dieron a su doctrina para diferenciarla de la de los utópicos. Pretendía basarse en el análisis histórico y económico del capitalismo y sostenía que el cambio social llegaría mediante la lucha organizada del proletariado.',
            fechas: [
              ['1848', 'Se publica el Manifiesto Comunista.'],
              ['1880', 'Engels publica «Del socialismo utópico al socialismo científico».']
            ],
            personajes: ['Karl Marx', 'Friedrich Engels']
          }),
          hoja('Diferencias entre ambos', {
            texto: 'Los utópicos apelaban a la razón y a la moral, buscaban la armonía entre las clases y experimentaban con comunidades modelo. El socialismo científico partía del análisis de la historia, veía el conflicto entre clases como motor del cambio y planteaba que los trabajadores debían tomar el poder político.',
            fechas: [],
            personajes: ['Robert Owen', 'Charles Fourier', 'Karl Marx', 'Friedrich Engels']
          })
        ]),

        grupo('Fundadores del marxismo', [
          hoja('Karl Marx (1818-1883)', {
            texto: 'Filósofo, economista y periodista alemán nacido en Tréveris. Perseguido por sus ideas, vivió desde 1849 exiliado en Londres, donde estudió a fondo la economía capitalista. En su obra principal, El capital, explica cómo el capitalismo obtiene su beneficio del trabajo asalariado.',
            fechas: [
              ['1818', 'Nace en Tréveris (Prusia).'],
              ['1848', 'Publica con Engels el Manifiesto Comunista.'],
              ['1867', 'Aparece el primer tomo de El capital.'],
              ['1883', 'Muere en Londres.']
            ],
            personajes: ['Friedrich Engels']
          }),
          hoja('Friedrich Engels (1820-1895)', {
            texto: 'Pensador alemán, hijo de un industrial textil. Conoció de cerca la vida obrera en Mánchester y la describió en «La situación de la clase obrera en Inglaterra». Fue colaborador y sostén económico de Marx y, tras su muerte, editó los tomos II y III de El capital.',
            fechas: [
              ['1845', 'Publica «La situación de la clase obrera en Inglaterra».'],
              ['1848', 'Escribe con Marx el Manifiesto Comunista.'],
              ['1885-1894', 'Edita los tomos II y III de El capital.']
            ],
            personajes: ['Karl Marx']
          })
        ]),

        grupo('Ideas del marxismo', [
          hoja('Crítica al capitalismo', {
            texto: 'Marx sostuvo que el obrero produce más valor del que recibe como salario. Esa diferencia, la plusvalía, queda en manos del capitalista. Por eso, según él, el sistema se basa en la explotación y provoca crisis periódicas y una desigualdad creciente.',
            fechas: [['1867', 'Marx desarrolla esta crítica en El capital.']],
            personajes: ['Karl Marx']
          }),
          hoja('Lucha de clases', {
            texto: 'Para el marxismo, la historia de las sociedades es la historia de la lucha de clases. En el capitalismo se enfrentan la burguesía, dueña de los medios de producción, y el proletariado, que solo posee su fuerza de trabajo.',
            fechas: [['1848', 'La idea se expone en el Manifiesto Comunista.']],
            personajes: ['Karl Marx', 'Friedrich Engels']
          }),
          hoja('Propiedad de los medios de producción', {
            texto: 'Los medios de producción son las fábricas, la tierra, las máquinas y las herramientas. El marxismo proponía abolir su propiedad privada y convertirlos en propiedad colectiva, para que la riqueza producida beneficiara a toda la sociedad.',
            fechas: [],
            personajes: ['Karl Marx']
          }),
          hoja('Materialismo histórico', {
            texto: 'Método con el que Marx y Engels explicaban la historia: la forma en que una sociedad produce sus bienes, y quién es dueño de los medios para producirlos, determina en gran medida su organización política, sus leyes y sus ideas.',
            fechas: [],
            personajes: ['Karl Marx', 'Friedrich Engels']
          })
        ]),

        grupo('Desarrollo del pensamiento comunista', [
          hoja('Manifiesto Comunista (1848)', {
            texto: 'Escrito por Marx y Engels por encargo de la Liga de los Comunistas y publicado en Londres en febrero de 1848. Expuso el programa comunista y terminó con un llamado a la unión de los proletarios de todos los países.',
            fechas: [['Febrero de 1848', 'Publicación en Londres.']],
            personajes: ['Karl Marx', 'Friedrich Engels']
          }),
          hoja('Primera Internacional (1864)', {
            texto: 'La Asociación Internacional de los Trabajadores, fundada en Londres, reunió a sindicatos y grupos obreros de varios países. Los enfrentamientos entre marxistas y anarquistas, encabezados por Bakunin, provocaron su división y su disolución.',
            fechas: [
              ['1864', 'Fundación en Londres.'],
              ['1872', 'Expulsión de los anarquistas.'],
              ['1876', 'Disolución.']
            ],
            personajes: ['Karl Marx', 'Mijaíl Bakunin']
          }),
          hoja('Comuna de París (1871)', {
            texto: 'Gobierno popular que controló París durante unos dos meses, hasta que fue reprimido con dureza por el ejército francés. Marx lo consideró el primer ejemplo de un gobierno de la clase obrera.',
            fechas: [['Marzo-mayo de 1871', 'La Comuna gobierna París.']],
            personajes: ['Karl Marx']
          }),
          hoja('Segunda Internacional', {
            texto: 'Fundada en París en 1889, agrupó a los grandes partidos socialistas. Pronto se dividió entre quienes buscaban reformas graduales por vía parlamentaria (el revisionismo de Bernstein) y quienes defendían la revolución, como el ala de la que surgirían los bolcheviques rusos.',
            fechas: [
              ['1889', 'Fundación en París.'],
              ['1899', 'Bernstein plantea la revisión del marxismo.'],
              ['1914', 'Se fractura al estallar la Primera Guerra Mundial.']
            ],
            personajes: ['Eduard Bernstein', 'Karl Kautsky', 'Rosa Luxemburgo']
          }),
          hoja('Del socialismo al comunismo', {
            texto: 'Marx previó una etapa de transición, la dictadura del proletariado, en la que los trabajadores controlarían el Estado. Después llegaría el comunismo: una sociedad sin clases, sin propiedad privada de los medios de producción y, finalmente, sin Estado.',
            fechas: [['1875', 'Marx describe estas etapas en la «Crítica del programa de Gotha».']],
            personajes: ['Karl Marx']
          })
        ])
      ]
    },

    /* ------------------------------------------------------------------
       RAMA 2: REVOLUCIÓN RUSA (lado derecho, rojo)
       ------------------------------------------------------------------ */
    {
      titulo: 'Revolución Rusa',
      color: '#cf3b3b',
      colorTexto: '#ffffff',
      lado: 1,
      hijos: [

        /* A. CAUSAS */
        grupo('Causas', [
          grupo('Causas políticas', [
            hoja('Autocracia del zar Nicolás II', {
              texto: 'A inicios del siglo XX, el Imperio Ruso permanecía estancado en un absolutismo monárquico obsoleto bajo el mandato de Nicolás II, quien gobernaba amparado en el "derecho divino". El monarca estaba firmemente convencido de que su poder provenía de un mandato sagrado otorgado por Dios, por lo que su voluntad era ley suprema y no debía rendir cuentas ni ante un parlamento ni ante sus súbditos. Como señala Florencio Hubeñak, esta mentalidad autocrática y rígida aceleró la descomposición política de la corona, volviéndola completamente impermeable frente a cualquier intento de modernización o reforma institucional. De este modo, el zarismo mantuvo al Estado anclado en prácticas propias del Antiguo Régimen, rechazando todo límite legal a la autoridad absoluta del emperador.',
              fechas: [['1894', 'Nicolás II llega al trono.']],
              personajes: ['Nicolás II']
            }),
            hoja('Concentración del poder político', {
              texto: 'Las decisiones dependían del zar, de su corte y de una burocracia ineficaz. Tras la Revolución de 1905 se creó la Duma (parlamento), pero el zar la disolvió varias veces y limitó sus funciones.',
              fechas: [
                ['1905', 'Revolución de 1905.'],
                ['1906', 'Se reúne la primera Duma.']
              ],
              personajes: ['Nicolás II']
            }),
            hoja('Represión política', {
              texto: 'La Ojrana, policía secreta zarista, vigilaba, encarcelaba o deportaba a Siberia a los opositores. En el «Domingo Sangriento», las tropas dispararon contra una marcha pacífica de obreros que llevaba peticiones al zar.',
              fechas: [['9 de enero de 1905 (22 de enero)', 'Domingo Sangriento en San Petersburgo.']],
              personajes: ['Nicolás II', 'Gueorgui Gapón']
            }),
            hoja('Falta de libertades políticas', {
              texto: 'Había censura de prensa y los partidos y sindicatos estaban prohibidos o muy limitados. Por eso muchos opositores actuaban en la clandestinidad o desde el exilio, como los socialdemócratas rusos.',
              fechas: [
                ['1898', 'Se funda el Partido Obrero Socialdemócrata Ruso.'],
                ['1903', 'El partido se divide en bolcheviques y mencheviques.']
              ],
              personajes: ['Vladimir Lenin', 'Yuli Mártov']
            })
          ]),
          grupo('Causas económicas y sociales', [
            hoja('Pobreza extrema', {
              texto: 'A inicios del siglo XX la gran mayoría de la población rusa era campesina, pobre y en buena parte analfabeta. Las malas cosechas provocaban hambrunas periódicas.',
              fechas: [['1891-1892', 'Gran hambruna en el Volga y otras regiones.']],
              personajes: []
            }),
            hoja('Explotación de los trabajadores', {
              texto: 'La industrialización, concentrada en San Petersburgo y Moscú, trajo jornadas que solían superar las diez horas, salarios bajos y viviendas insalubres. Los obreros eran una minoría, pero se agrupaban en grandes fábricas, lo que facilitó su organización.',
              fechas: [['1890-1914', 'Rápida industrialización con capital extranjero.']],
              personajes: []
            }),
            hoja('Desigualdad social', {
              texto: 'Una pequeña élite de nobles, alto clero y gran burguesía concentraba la riqueza y la tierra, mientras millones de campesinos y obreros vivían en la miseria.',
              fechas: [],
              personajes: []
            }),
            hoja('Explotación agraria', {
              texto: 'Aunque la servidumbre se abolió en 1861, los campesinos recibieron poca tierra y debieron pagarla durante décadas. La mejor tierra siguió en manos de los nobles terratenientes.',
              fechas: [
                ['1861', 'Abolición de la servidumbre.'],
                ['1906', 'Reforma agraria de Stolypin, con resultados limitados.']
              ],
              personajes: ['Alejandro II', 'Piotr Stolypin']
            }),
            hoja('Vida del campesinado', {
              texto: 'Las familias campesinas trabajaban con técnicas atrasadas dentro de la comuna rural (mir), que repartía las tierras entre ellas. El deseo de tener tierra propia fue una de las grandes aspiraciones de la revolución.',
              fechas: [],
              personajes: []
            })
          ]),
          grupo('Factor detonante', [
            hoja('Rusia en la Primera Guerra Mundial', {
              texto: 'Rusia entró en la guerra en 1914 junto a Francia y el Reino Unido. Su ejército era numeroso, pero le faltaban armas, munición y buenos mandos. En 1915 el propio zar asumió el mando militar, lo que lo hizo responsable directo de las derrotas.',
              fechas: [
                ['1914', 'Rusia entra en la guerra.'],
                ['1915', 'Nicolás II asume el mando del ejército.']
              ],
              personajes: ['Nicolás II']
            }),
            hoja('Derrotas militares', {
              texto: 'Desde la derrota de Tannenberg y las grandes retiradas de 1915, Rusia sufrió millones de bajas entre muertos, heridos y prisioneros. La moral se hundió y aumentaron las deserciones.',
              fechas: [
                ['Agosto de 1914', 'Derrota de Tannenberg.'],
                ['1915', 'Gran retirada del frente ruso.']
              ],
              personajes: []
            }),
            hoja('Escasez de alimentos', {
              texto: 'La movilización de millones de campesinos redujo las cosechas, y los ferrocarriles, saturados por la guerra, no llevaban suficientes alimentos ni combustible a las ciudades.',
              fechas: [],
              personajes: []
            }),
            hoja('Hambre', {
              texto: 'En el invierno de 1916-1917 las ciudades sufrieron largas colas para conseguir pan y una fuerte subida de precios. El hambre en Petrogrado fue la chispa directa de las protestas de febrero de 1917.',
              fechas: [['Invierno 1916-1917', 'Colas y escasez de pan en Petrogrado.']],
              personajes: []
            }),
            hoja('Descontento popular', {
              texto: 'Obreros, campesinos, soldados e incluso parte de la nobleza perdieron la confianza en el zar. La influencia de Rasputín sobre la familia imperial desprestigió aún más a la monarquía.',
              fechas: [['Diciembre de 1916', 'Asesinato de Rasputín.']],
              personajes: ['Grigori Rasputín', 'Alejandra Fiódorovna', 'Nicolás II']
            })
          ])
        ]),

        /* B. ACTORES */
        grupo('Actores', [
          grupo('Karl Marx', [
            hoja('Biografía breve', {
              texto: 'Pensador alemán (1818-1883). Murió más de treinta años antes de la revolución, así que no participó en ella: su papel fue el de inspirador ideológico.',
              fechas: [['1818-1883', 'Vida de Marx.']],
              personajes: ['Karl Marx']
            }),
            hoja('Ideas principales', {
              texto: 'La lucha de clases, la crítica al capitalismo, la revolución del proletariado y la construcción de una sociedad sin clases. Se desarrollan en la rama «Socialismo y comunismo».',
              fechas: [],
              personajes: ['Karl Marx', 'Friedrich Engels']
            }),
            hoja('Influencia en el movimiento revolucionario', {
              texto: 'El capital se tradujo al ruso en 1872, su primera traducción. En 1898 se fundó el Partido Obrero Socialdemócrata Ruso, de inspiración marxista, del que salieron bolcheviques y mencheviques. Lenin adaptó el marxismo a un país mayoritariamente campesino.',
              fechas: [
                ['1872', 'Primera traducción de El capital, al ruso.'],
                ['1898', 'Fundación del partido socialdemócrata ruso.']
              ],
              personajes: ['Vladimir Lenin', 'Gueorgui Plejánov']
            })
          ]),
          grupo('Vladimir Lenin', [
            hoja('Biografía breve', {
              texto: 'Vladímir Ilich Uliánov (1870-1924), conocido como Lenin. Su hermano mayor fue ejecutado en 1887 por conspirar contra el zar. Fue deportado a Siberia y vivió años exiliado en Europa hasta que volvió a Rusia en abril de 1917.',
              fechas: [
                ['1870', 'Nace en Simbirsk.'],
                ['1897', 'Es deportado a Siberia.'],
                ['Abril de 1917', 'Regresa a Petrogrado.'],
                ['1924', 'Muere.']
              ],
              personajes: ['Vladimir Lenin']
            }),
            hoja('Ideología bolchevique', {
              texto: 'Lenin defendió un partido de revolucionarios profesionales, disciplinado y centralizado, que guiara a la clase obrera. En 1903 su facción, los bolcheviques («mayoritarios»), se separó de los mencheviques, más moderados.',
              fechas: [
                ['1902', 'Publica «¿Qué hacer?».'],
                ['1903', 'División entre bolcheviques y mencheviques.']
              ],
              personajes: ['Vladimir Lenin', 'Yuli Mártov']
            }),
            hoja('Liderazgo en la Revolución de Octubre', {
              texto: 'En las Tesis de abril reclamó «paz, pan y tierra» y «todo el poder a los sóviets». Convenció a su partido de tomar el poder en octubre de 1917 y luego presidió el Consejo de Comisarios del Pueblo, el nuevo gobierno.',
              fechas: [
                ['Abril de 1917', 'Tesis de abril.'],
                ['Octubre de 1917', 'Dirige la toma del poder.']
              ],
              personajes: ['Vladimir Lenin', 'León Trotski']
            })
          ]),
          grupo('León Trotski', [
            hoja('Biografía breve', {
              texto: 'Lev Davídovich Bronstein (1879-1940), revolucionario marxista y gran orador. Presidió el Sóviet de San Petersburgo en 1905. Enfrentado con Stalin, fue expulsado de la URSS en 1929 y asesinado en México en 1940.',
              fechas: [
                ['1905', 'Preside el Sóviet de San Petersburgo.'],
                ['1929', 'Es expulsado de la URSS.'],
                ['1940', 'Es asesinado en México.']
              ],
              personajes: ['León Trotski', 'Iósif Stalin']
            }),
            hoja('Participación revolucionaria', {
              texto: 'Se unió a los bolcheviques en 1917. Como presidente del Sóviet de Petrogrado y dirigente del Comité Militar Revolucionario, planificó la insurrección armada de octubre.',
              fechas: [
                ['Septiembre de 1917', 'Preside el Sóviet de Petrogrado.'],
                ['Octubre de 1917', 'Organiza la insurrección.']
              ],
              personajes: ['León Trotski', 'Vladimir Lenin']
            }),
            hoja('Organización del Ejército Rojo', {
              texto: 'Como comisario de Guerra desde 1918 creó el Ejército Rojo: impuso disciplina, incorporó a antiguos oficiales zaristas vigilados por comisarios políticos y lo convirtió en una fuerza de millones de soldados que ganó la guerra civil.',
              fechas: [
                ['1918', 'Es nombrado comisario de Guerra.'],
                ['1918-1921', 'Dirige el Ejército Rojo en la guerra civil.']
              ],
              personajes: ['León Trotski']
            })
          ]),
          grupo('Nicolás II', [
            hoja('Biografía breve', {
              texto: 'Último zar de Rusia (1868-1918), de la dinastía Románov. Reinó desde 1894. Fue ejecutado junto a su familia por los bolcheviques en Ekaterimburgo en julio de 1918.',
              fechas: [
                ['1894', 'Llega al trono.'],
                ['Julio de 1918', 'Es ejecutado con su familia.']
              ],
              personajes: ['Nicolás II', 'Alejandra Fiódorovna']
            }),
            hoja('Gobierno autocrático', {
              texto: 'Defendió el poder absoluto heredado de sus antecesores. Tras la Revolución de 1905 aceptó a regañadientes una Duma con el Manifiesto de Octubre, pero siguió gobernando sin un control real.',
              fechas: [['Octubre de 1905', 'Manifiesto de Octubre.']],
              personajes: ['Nicolás II', 'Serguéi Witte']
            }),
            hoja('Abdicación y caída del zarismo', {
              texto: 'Ante la revolución de febrero y sin el apoyo del ejército, abdicó. Su hermano Miguel rechazó la corona y terminaron más de 300 años de la dinastía Románov.',
              fechas: [['2 de marzo de 1917 (15 de marzo)', 'Abdicación de Nicolás II.']],
              personajes: ['Nicolás II', 'Gran duque Miguel']
            })
          ]),
          grupo('Los sóviets', [
            hoja('Qué eran', {
              texto: '«Sóviet» significa «consejo» en ruso. Eran asambleas de delegados elegidos por obreros, soldados y, más tarde, campesinos. Aparecieron por primera vez en la Revolución de 1905.',
              fechas: [['1905', 'Primeros sóviets.']],
              personajes: []
            }),
            hoja('Cómo se organizaban', {
              texto: 'Los delegados se elegían en fábricas y regimientos y podían ser revocados. Cada sóviet tenía un comité ejecutivo, y los sóviets de todo el país se reunían en congresos nacionales.',
              fechas: [['Junio de 1917', 'I Congreso de los Sóviets de toda Rusia.']],
              personajes: []
            }),
            hoja('Participación de obreros y soldados', {
              texto: 'El Sóviet de Petrogrado unió a obreros y soldados. Su Orden n.º 1 puso a las tropas bajo su autoridad política, por encima de sus oficiales.',
              fechas: [
                ['27 de febrero de 1917 (12 de marzo)', 'Nace el Sóviet de Petrogrado.'],
                ['1 de marzo de 1917 (14 de marzo)', 'Orden n.º 1.']
              ],
              personajes: []
            }),
            hoja('Importancia en la revolución', {
              texto: 'Tras febrero hubo un «doble poder»: el Gobierno provisional y los sóviets. Cuando los bolcheviques obtuvieron la mayoría en los sóviets de Petrogrado y Moscú, tomaron el poder en octubre en su nombre.',
              fechas: [
                ['Septiembre de 1917', 'Mayoría bolchevique en Petrogrado y Moscú.'],
                ['25 de octubre de 1917 (7 de noviembre)', 'II Congreso de los Sóviets.']
              ],
              personajes: ['Vladimir Lenin', 'León Trotski']
            })
          ])
        ]),

        /* C. ACONTECIMIENTOS
           Investigación: Jair. Fuente principal: Hubeñák (2006), cap. 12,
           «La revolución rusa», pp. 363-365. Cronología completada con
           Encyclopaedia Britannica y el Archivo Histórico Provincial de Málaga. */
        grupo('Acontecimientos', [
          grupo('Revolución de Febrero de 1917', [
            hoja('Antecedentes: un zar sin prestigio', {
              texto: 'Según Hubeñák, los movimientos populistas, socialistas y anarquistas del siglo XIX «encontraron terreno propicio en el clima socio-religioso de Rusia y en la pérdida de prestigio del Zar». Nicolás II, «el padre del pueblo», quedó debilitado por su personalidad, por la derrota ante Japón (1904-1905) y por su «lamentable papel» en la Primera Guerra Mundial. Hacia el invierno de 1916-1917, «el ansia de guerra se había agotado».',
              fechas: [
                ['1904-1905', 'Derrota en la guerra ruso-japonesa.'],
                ['1905', 'Sublevación del acorazado Potemkin, símbolo del descontento.'],
                ['Invierno 1916-1917', 'Agotamiento de la guerra y escasez de alimentos.']
              ],
              personajes: ['Nicolás II'],
              fuentes: ['Hubeñák (2006, pp. 362-364)'],
              imagenes: [
                img('Nikolaus II. (Russland).jpg', 'Nicolás II, último zar de Rusia.')
              ]
            }),
            hoja('Huelgas y motín en Petrogrado', {
              texto: 'El 23 de febrero, Día Internacional de la Mujer, unos 130 000 obreros salieron a las calles de Petrogrado; la principal queja era la falta de pan. En dos días la huelga era general. El zar ordenó reprimirla y, tras una jornada con decenas de muertos, los regimientos de la Guardia se amotinaron y se pasaron a los manifestantes. Los ministros huyeron y nació el Sóviet de Petrogrado.',
              fechas: [
                ['23 de febrero de 1917 (8 de marzo)', 'Comienzan las huelgas: unos 130 000 obreros.'],
                ['25 de febrero de 1917 (10 de marzo)', 'Huelga general; el zar ordena reprimirla.'],
                ['26 de febrero de 1917 (11 de marzo)', 'La policía dispara; la Guardia se amotina.'],
                ['27 de febrero de 1917 (12 de marzo)', 'Huida de los ministros; se funda el Sóviet de Petrogrado.']
              ],
              personajes: ['Nicolás II', 'General Serguéi Jabálov'],
              fuentes: ['Encyclopaedia Britannica (s. f.-b)'],
              imagenes: [
                img("International Women's Day - February Revolution - Petrograd.jpg", 'Manifestación del Día Internacional de la Mujer en Petrogrado, 23 de febrero (8 de marzo) de 1917.'),
                img('Soldiers demonstration.February 1917.jpg', 'Soldados amotinados se suman a la revolución, febrero de 1917.')
              ]
            }),
            hoja('Abdicación de Nicolás II', {
              texto: 'Sin control de la capital y presionado por la Duma y sus generales, el zar abdicó por él y por su hijo, el zarévich Alexis, a favor de su hermano, el gran duque Miguel. Hubeñák interpreta el «golpe de estado» de febrero como un intento, «al estilo francés de medio siglo antes», de formar una monarquía constitucional, impulsado por una intelligentsia «embebida en las ideas liberales».',
              fechas: [
                ['2 de marzo de 1917 (15 de marzo)', 'Nicolás II abdica.']
              ],
              personajes: ['Nicolás II', 'Gran duque Miguel', 'Aleksandr Guchkov', 'Vasili Shulguín'],
              fuentes: ['Hubeñák (2006, p. 364)', 'Encyclopaedia Britannica (s. f.-b; s. f.-c)'],
              imagenes: [
                img('1917 март Отречение Николая II манифест.jpg', 'Manifiesto de abdicación de Nicolás II, marzo de 1917.'),
                img('The last photo of Nicholas II.jpg', 'Nicolás II tras su abdicación, en Tsárskoye Seló (1917).')
              ]
            }),
            hoja('Fin de la dinastía Románov', {
              texto: 'Al día siguiente el gran duque Miguel rechazó la corona. Terminaban así más de tres siglos de gobierno de los Románov. El futuro régimen de Rusia quedaba en manos de una Asamblea Constituyente que debía elegirse.',
              fechas: [
                ['3 de marzo de 1917 (16 de marzo)', 'Miguel rechaza el trono: cae la monarquía.']
              ],
              personajes: ['Gran duque Miguel'],
              fuentes: ['Encyclopaedia Britannica (s. f.-b)']
            })
          ]),
          grupo('Gobierno provisional', [
            hoja('Formación y «doble poder»', {
              texto: 'El Comité de la Duma formó un gobierno liberal presidido por el príncipe Gueorgui Lvov. Al mismo tiempo actuaba el Sóviet de Petrogrado, cuya Orden n.º 1 puso a los soldados bajo su autoridad. Surgieron así «dos autoridades separadas, ambas afirmando hablar en nombre del pueblo»: el Gobierno tenía la autoridad formal; el Sóviet era «depositario del poder real».',
              fechas: [
                ['28 de febrero de 1917 (13 de marzo)', 'La Duma acuerda un gobierno presidido por Lvov.'],
                ['1 de marzo de 1917 (14 de marzo)', 'Asume el Gobierno provisional; Orden n.º 1 del Sóviet.']
              ],
              personajes: ['Gueorgui Lvov', 'Aleksandr Kérenski'],
              fuentes: ['Encyclopaedia Britannica (s. f.-b; s. f.-c)'],
              imagenes: [
                img('Governo provvisorio russo marzo 1917.jpg', 'Primer Gobierno provisional, marzo de 1917.'),
                img('Georgy Lvov 1917.jpg', 'El príncipe Gueorgui Lvov, primer jefe del Gobierno provisional.')
              ]
            }),
            hoja('Programa y límites', {
              texto: 'El Sóviet exigía paz inmediata, tierra para los campesinos, jornada de ocho horas y república democrática. El Gobierno provisional, en cambio, aplazó las grandes decisiones hasta la Asamblea Constituyente y mantuvo a Rusia en la guerra. El fracaso de la ofensiva de junio hundió su popularidad: los soldados, dijo Lenin, «votaron por la paz con los pies».',
              fechas: [
                ['18 de junio de 1917 (1 de julio)', 'Ofensiva de Brusílov, que fracasa en dos semanas.']
              ],
              personajes: ['Gueorgui Lvov', 'Aleksandr Kérenski', 'Alekséi Brusílov'],
              fuentes: ['Archivo Histórico Provincial de Málaga (2017)', 'Encyclopaedia Britannica (s. f.-b)'],
              imagenes: [
                img('Political demonstration at Petrograd, 18th June 1917 (14264213940).jpg', 'Manifestación política en Petrogrado, 18 de junio (1 de julio) de 1917.')
              ]
            }),
            hoja('De Lvov a Kérenski', {
              texto: 'Tras las Jornadas de Julio, un levantamiento bolchevique fallido con más de 400 muertos, Lenin pasó a la clandestinidad y Trotski fue encarcelado. Lvov renunció y Aleksandr Kérenski, socialista moderado, asumió como primer ministro. Hubeñák llama a este gobierno el gobierno «democrático».',
              fechas: [
                ['3-4 de julio de 1917 (16-17 de julio)', 'Jornadas de Julio.'],
                ['8 de julio de 1917 (21 de julio)', 'Kérenski reemplaza a Lvov como primer ministro.']
              ],
              personajes: ['Aleksandr Kérenski', 'Gueorgui Lvov', 'Vladimir Lenin', 'León Trotski'],
              fuentes: ['Hubeñák (2006, p. 364)', 'Encyclopaedia Britannica (s. f.-b; s. f.-c)'],
              imagenes: [
                img('Alexander Kerensky 1917.jpg', 'Aleksandr Kérenski, primer ministro desde julio de 1917.'),
                img('19170704 Riot on Nevsky prosp Petrograd.jpg', 'Jornadas de Julio: disparos sobre la multitud en la avenida Nevski, 4 (17) de julio de 1917.')
              ]
            }),
            hoja('El asunto Kornílov', {
              texto: 'A fines de agosto el general Kornílov, comandante en jefe, marchó sobre Petrogrado para aplastar a los sóviets. El Gobierno, incapaz de defenderse, aceptó armar a los obreros, y bajo mando bolchevique el golpe fue sofocado. Las masas se radicalizaron: los bolcheviques ganaron prestigio y, en septiembre, la mayoría en los sóviets de Petrogrado y Moscú.',
              fechas: [
                ['Fines de agosto de 1917 (septiembre)', 'Intento de golpe de Kornílov.'],
                ['Mediados de septiembre de 1917', 'Mayoría bolchevique en Petrogrado y Moscú.']
              ],
              personajes: ['Lavr Kornílov', 'Aleksandr Kérenski', 'León Trotski'],
              fuentes: ['Archivo Histórico Provincial de Málaga (2017)', 'Encyclopaedia Britannica (2026; s. f.-b)'],
              imagenes: [
                img('Kornilov 1917.jpg', 'El general Lavr Kornílov en 1917.')
              ]
            })
          ]),
          grupo('Revolución de Octubre de 1917', [
            hoja('Lenin y las Tesis de abril', {
              texto: 'Lenin llegó a Petrogrado desde el exilio. En las Tesis de abril propuso no apoyar al Gobierno provisional, paz inmediata, confiscación de las tierras de los terratenientes y «todo el poder a los sóviets». Hubeñák destaca esta obra, junto a «¿Qué hacer?», como clave para entender la revolución.',
              fechas: [
                ['3 de abril de 1917 (16 de abril)', 'Lenin regresa a Petrogrado.'],
                ['Abril de 1917', 'Tesis de abril; la Conferencia del partido las adopta.']
              ],
              personajes: ['Vladimir Lenin'],
              fuentes: ['Hubeñák (2006, p. 364, n. 21)', 'Encyclopaedia Britannica (s. f.-d)'],
              imagenes: [
                img('Lenin in Stockholm 1917.jpg', 'Lenin en Estocolmo, de regreso a Rusia, abril de 1917.'),
                img('Vladimir Lenin, 1917.jpg', 'Vladímir Lenin en 1917.')
              ]
            }),
            hoja('Preparación de la insurrección', {
              texto: 'Lenin, de regreso clandestino desde Finlandia, convenció al Comité Central de preparar la toma armada del poder. Trotski, presidente del Sóviet de Petrogrado, dirigió el Comité Militar Revolucionario, que logró que la guarnición de la capital lo reconociera como único órgano de poder. Hubeñák subraya que los comunistas actuaron «organizados en soviets (consejos)».',
              fechas: [
                ['10 de octubre de 1917 (23 de octubre)', 'El Comité Central aprueba la insurrección.'],
                ['21-22 de octubre de 1917 (3-4 de noviembre)', 'La guarnición obedece al Comité Militar Revolucionario.']
              ],
              personajes: ['Vladimir Lenin', 'León Trotski'],
              fuentes: ['Hubeñák (2006, p. 364)', 'Encyclopaedia Britannica (s. f.-b; s. f.-d)'],
              imagenes: [
                img('LeninAsIvanov1917.jpg', 'Lenin disfrazado, con el nombre falso de «Ivánov», durante la clandestinidad (1917).'),
                img('Leo Trotzki 1917.jpg', 'León Trotski en 1917, presidente del Sóviet de Petrogrado.')
              ]
            }),
            hoja('Toma del Palacio de Invierno', {
              texto: 'Guardias Rojos, soldados y marinos ocuparon estaciones, puentes y el telégrafo de Petrogrado casi sin resistencia. Kérenski partió hacia el frente en busca de tropas. En la noche siguiente fue tomado el Palacio de Invierno, sede del Gobierno provisional, y sus ministros fueron arrestados. Britannica lo describe como un golpe «en gran medida incruento».',
              fechas: [
                ['24-25 de octubre de 1917 (6-7 de noviembre)', 'Ocupación de los puntos clave de Petrogrado.'],
                ['Noche del 25 al 26 de octubre de 1917 (7-8 de noviembre)', 'Toma del Palacio de Invierno; arresto de los ministros.']
              ],
              personajes: ['León Trotski', 'Aleksandr Kérenski'],
              fuentes: ['Archivo Histórico Provincial de Málaga (2017)', 'Encyclopaedia Britannica (s. f.-b; s. f.-c)'],
              imagenes: [
                img('Stormningen av vinterpalatset.jpg', 'La toma del Palacio de Invierno (imagen difundida posteriormente).'),
                img('After the capture of the Winter Palace 26 October 1917.jpg', 'Tras la toma del Palacio de Invierno, 26 de octubre (8 de noviembre) de 1917.')
              ]
            }),
            hoja('Victoria bolchevique', {
              texto: 'El II Congreso Panruso de los Sóviets asumió el poder; mencheviques y socialrevolucionarios moderados se retiraron. El Congreso creó el Consejo de Comisarios del Pueblo, presidido por Lenin y con Trotski en Asuntos Exteriores, y aprobó el Decreto de Paz y el Decreto de Tierra. Para Hubeñák fue «la primera revolución proletaria de la historia».',
              fechas: [
                ['25 de octubre de 1917 (7 de noviembre)', 'Se abre el II Congreso de los Sóviets.'],
                ['26 de octubre de 1917 (8 de noviembre)', 'Consejo de Comisarios del Pueblo; Decretos de Paz y de Tierra.']
              ],
              personajes: ['Vladimir Lenin', 'León Trotski'],
              fuentes: ['Hubeñák (2006, p. 364)', 'Encyclopaedia Britannica (s. f.-b; s. f.-d)'],
              imagenes: [
                img("Gothic Hall of the Winter Palace after the seizure by Soviets' military troops.jpg", 'Sala del Palacio de Invierno tras la ocupación por las tropas de los sóviets.')
              ]
            }),
            hoja('La proclama de los sóviets', {
              texto: 'Hubeñák recoge la proclama bolchevique de octubre: «Nosotros, los soviets de los diputados obreros, soldados y campesinos, vamos a intentar una experiencia única en la historia. Vamos a fundar un gobierno cuya única meta será la de satisfacer las necesidades de los soldados, obreros y campesinos». Los bolcheviques («mayoritarios», de bolshie) se llamaban así frente a los mencheviques («minoritarios»).',
              fechas: [
                ['Octubre de 1917', 'Proclama del nuevo gobierno de los sóviets.']
              ],
              personajes: ['Vladimir Lenin', 'León Trotski'],
              fuentes: ['Hubeñák (2006, p. 364, n. 24)']
            }),
            hoja('Leyenda y realidad', {
              texto: 'Hubeñák advierte que el asalto al Palacio de Invierno, como la toma de la Bastilla, fue un hecho «relativamente insignificante» en lo militar: «su verdadero papel fue simbólico» y muestra «la importancia de los mitos en los acontecimientos históricos». La «dictadura del proletariado» se institucionalizó después, tras la guerra civil, con el Komintern (1919) y la URSS (1922).',
              fechas: [
                ['1919', 'Creación de la III Internacional (Komintern).'],
                ['1922', 'Conformación de la URSS.']
              ],
              personajes: ['Vladimir Lenin', 'León Trotski', 'Iósif Stalin'],
              fuentes: ['Hubeñák (2006, pp. 364-365)'],
              imagenes: [
                img('May 1st 1917, Petrograd (14264130389).jpg', 'Multitud en Petrogrado, 1.º de mayo de 1917.')
              ]
            })
          ])
        ]),

        /* D. CONSECUENCIAS */
        grupo('Consecuencias', [
          grupo('Tratado de Brest-Litovsk', [
            hoja('Firma del tratado', {
              texto: 'Firmado con Alemania y sus aliados para cumplir la promesa bolchevique de paz. Rusia cedió extensos territorios estratégicos, perdiendo el control sobre Polonia, Finlandia y los países bálticos.',
              fechas: [['Marzo de 1918', 'Firma del Tratado de Brest-Litovsk.']],
              personajes: ['Vladimir Lenin', 'León Trotski']
            }),
            hoja('Salida de la Primera Guerra Mundial', {
              texto: 'Rusia abandonó el conflicto mundial para priorizar la supervivencia de la revolución interna. Tras la derrota de los imperios centrales en noviembre de 1918, resurgieron o se consolidaron como repúblicas independientes Polonia, Finlandia, Lituania, Estonia y Letonia.',
              fechas: [
                ['Marzo de 1918', 'Retirada oficial de Rusia de la guerra.'],
                ['Noviembre de 1918', 'Fin de la Primera Guerra Mundial y caída de los imperios absolutistas.']
              ],
              personajes: ['Vladimir Lenin']
            })
          ]),
          grupo('Guerra Civil Rusa', [
            hoja('Ejército Rojo contra Ejército Blanco', {
              texto: 'Enfrentamiento sangriento entre el Ejército Rojo bolchevique y el Ejército Blanco (monárquicos y fuerzas antibolcheviques apoyadas por potencias extranjeras). La victoria comunista aseguró la supervivencia del nuevo régimen.',
              fechas: [['1918-1922', 'Desarrollo de la Guerra Civil Rusa.']],
              personajes: ['Vladimir Lenin', 'León Trotski']
            }),
            hoja('Choque entre utopía y realidad autoritaria', {
              texto: 'Para ganar la guerra, se institucionalizó la «dictadura del proletariado» y el monopolio absoluto del Partido Comunista. El racionamiento, las requisas de grano y la violencia bélica provocaron una grave escasez y millones de víctimas.',
              fechas: [['1918-1922', 'Consolidación del poder único bolchevique.']],
              personajes: ['Vladimir Lenin', 'León Trotski']
            })
          ]),
          grupo('Transformaciones económicas y sociales', [
            hoja('Abolición de la propiedad privada', {
              texto: 'Se transfirió el poder a los sóviets de obreros, soldados y campesinos. El Estado expropió sin indemnización las tierras de la nobleza y nacionalizó fábricas, bancos y medios de producción.',
              fechas: [['Octubre de 1917', 'Primeros decretos revolucionarios de tierra y control estatal.']],
              personajes: ['Vladimir Lenin']
            }),
            hoja('Comunismo de guerra y planificación estatal', {
              texto: 'Durante la guerra civil el Estado aplicó la requisa forzosa de cosechas a los campesinos para sostener al ejército. Posteriormente, el régimen impulsó una economía planificada basada en la electrificación y la industrialización.',
              fechas: [['1918-1922', 'Aplicación del «comunismo de guerra».']],
              personajes: ['Vladimir Lenin', 'Iósif Stalin']
            })
          ]),
          grupo('Creación de la URSS y legado global', [
            hoja('Fundación de la URSS y el Komintern', {
              texto: 'Tras la victoria bolchevique se fundó la Unión de Repúblicas Socialistas Soviéticas (URSS), con eje en Rusia e incorporando repúblicas de Europa y Asia. Previamente, en 1919, se creó la III Internacional (Komintern) para expandir la revolución comunista al resto del mundo.',
              fechas: [
                ['1919', 'Creación de la III Internacional o Komintern.'],
                ['1922', 'Fundación oficial de la URSS.']
              ],
              personajes: ['Vladimir Lenin', 'Iósif Stalin']
            }),
            hoja('Ascenso de Stalin y proyección del siglo XX', {
              texto: 'Tras la muerte de Lenin en 1924, Stalin eliminó a la oposición interna mediante purgas, gobernó con mano de hierro hasta 1953 e impuso los planes quinquenales y la colectivización forzosa del campo. La URSS se consolidó como superpotencia, dividiendo al mundo en bloques durante la Guerra Fría hasta su disolución en 1991.',
              fechas: [
                ['1924', 'Muerte de Lenin y ascenso de Stalin al poder.'],
                ['1945-1991', 'Expansión soviética, Guerra Fría y desintegración de la URSS.']
              ],
              personajes: ['Iósif Stalin', 'León Trotski']
            })
          ])
        ])
      ]
    }
  ]
};

/* ==========================================================================
   4. MAPA MENTAL — FUNCIONAMIENTO
   ========================================================================== */
(function iniciarMapaMental() {
  const contenedor = document.getElementById('contenedor-mapa-mental');
  if (!contenedor) return;

  /* ---------- 4.1 Referencias al HTML ---------- */
  const vista = document.getElementById('mm-vista');
  const mundo = document.getElementById('mm-mundo');
  const capaLineas = document.getElementById('mm-lineas');
  const capaNodos = document.getElementById('mm-nodos');
  const indicadorNivel = document.getElementById('mm-nivel');
  const migas = document.getElementById('mm-migas');
  const btnGeneral = document.getElementById('mm-btn-general');
  const btnAtras = document.getElementById('mm-btn-atras');
  const btnExpandir = document.getElementById('mm-btn-expandir');
  const btnExpandirTexto = document.getElementById('mm-btn-expandir-texto');
  const btnExpandirIcono = document.getElementById('mm-btn-expandir-icono');
  const tarjeta = document.getElementById('mm-tarjeta');
  const tarjetaRuta = document.getElementById('mm-tarjeta-ruta');
  const tarjetaTitulo = document.getElementById('mm-tarjeta-titulo');
  const tarjetaTexto = document.getElementById('mm-tarjeta-texto');
  const tarjetaFechas = document.getElementById('mm-tarjeta-fechas');
  const tarjetaPersonajes = document.getElementById('mm-tarjeta-personajes');
  const bloqueFechas = document.getElementById('mm-tarjeta-bloque-fechas');
  const bloquePersonajes = document.getElementById('mm-tarjeta-bloque-personajes');
  const tarjetaFuentes = document.getElementById('mm-tarjeta-fuentes');
  const bloqueFuentes = document.getElementById('mm-tarjeta-bloque-fuentes');
  const tarjetaImagenes = document.getElementById('mm-tarjeta-imagenes');
  const bloqueImagenes = document.getElementById('mm-tarjeta-bloque-imagenes');
  const visor = document.getElementById('mm-visor');
  const visorImg = document.getElementById('mm-visor-img');
  const visorPie = document.getElementById('mm-visor-pie');
  const visorCredito = document.getElementById('mm-visor-credito');

  /* ---------- 4.2 Ajustes generales ---------- */
  const AJUSTES = {
    anchoCompacto: 640,      // por debajo de este ancho: modo celular
    separacionH: 60,         // distancia horizontal entre niveles
    separacionHCompacta: 34,
    separacionV: [0, 44, 22, 12, 10], // distancia vertical según el nivel
    margen: 36,              // espacio libre al encuadrar
    zoomMin: 0.25,
    zoomMax: 2.2,
    zoomAutoMax: 1.15,       // acercamiento máximo automático
    duracion: 600            // duración de las animaciones (ms)
  };
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 4.3 Estado ---------- */
  const nodos = [];           // lista plana de todos los nodos
  let raiz = null;            // nodo central
  let foco = null;            // nodo que se está explorando
  let hojaAbierta = null;     // concepto cuya tarjeta está abierta
  let modoTodo = false;       // "Expandir todo" activado
  let compacto = false;       // diseño para pantallas angostas
  const camara = { x: 0, y: 0, k: 1 };

  /* ==========================================================
     4.4 GENERACIÓN DE NODOS Y LÍNEAS
     ========================================================== */
  function crearNodo(dato, padre, rama) {
    const n = {
      id: nodos.length,
      titulo: dato.titulo,
      ficha: dato.ficha || null,
      hijos: [],
      padre: padre,
      prof: padre ? padre.prof + 1 : 0,
      color: rama ? rama.color : '#c99700',
      colorTexto: rama ? rama.colorTexto : '#0f1115',
      ladoBase: rama ? rama.lado : 0,
      lado: rama ? rama.lado : 0,
      expandido: false,
      visible: false,
      w: 0, h: 0,             // tamaño medido
      x: 0, y: 0,             // posición actual (centro)
      tx: 0, ty: 0,           // posición de destino
      sub: 0, sumaHijos: 0,   // alturas para la distribución
      el: null,
      linea: null
    };
    nodos.push(n);

    const esHoja = !dato.hijos || dato.hijos.length === 0;

    // Elemento HTML del nodo
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'mm-nodo mm-nodo--p' + Math.min(n.prof, 3) + (esHoja && n.prof > 0 ? ' mm-nodo--hoja' : '');
    el.style.setProperty('--c', n.color);
    el.style.setProperty('--t', n.colorTexto);
    el.tabIndex = -1;

    const texto = document.createElement('span');
    texto.className = 'mm-nodo__texto';
    texto.textContent = n.titulo;
    el.appendChild(texto);

    if (!esHoja && n.prof > 0) {
      const signo = document.createElement('span');
      signo.className = 'mm-nodo__signo';
      signo.setAttribute('aria-hidden', 'true');
      signo.textContent = '+';
      el.appendChild(signo);
      n.signo = signo;
    } else if (esHoja) {
      const info = document.createElement('span');
      info.className = 'mm-nodo__info';
      info.setAttribute('aria-hidden', 'true');
      info.textContent = 'i';
      el.appendChild(info);
      el.setAttribute('aria-label', n.titulo + ' (ver ficha)');
    }

    el.addEventListener('click', function (e) { alHacerClic(n, e); });
    capaNodos.appendChild(el);
    n.el = el;

    // Línea curva hacia el nodo padre
    if (padre) {
      const linea = document.createElementNS(SVG_NS, 'path');
      linea.setAttribute('class', 'mm-linea');
      linea.style.stroke = n.color;
      linea.style.strokeWidth = n.prof === 1 ? 3 : (n.prof === 2 ? 2.2 : 1.6);
      capaLineas.appendChild(linea);
      n.linea = linea;
    }

    // Hijos (cada rama principal define su propio color y lado)
    (dato.hijos || []).forEach(function (datoHijo) {
      const ramaHijo = n.prof === 0 ? datoHijo : rama;
      n.hijos.push(crearNodo(datoHijo, n, ramaHijo));
    });

    return n;
  }

  // Lado del nodo (izquierda/derecha) para el diseño y para el CSS
  function asignarLados() {
    nodos.forEach(function (n) {
      if (n.prof === 0) return;
      n.lado = compacto ? 1 : n.ladoBase;
      n.el.dataset.lado = n.lado < 0 ? 'izq' : 'der';
    });
  }

  // Mide el tamaño real de cada nodo (depende del texto y del CSS)
  function medir() {
    nodos.forEach(function (n) {
      n.w = n.el.offsetWidth;
      n.h = n.el.offsetHeight;
    });
  }

  /* ==========================================================
     4.5 DISTRIBUCIÓN (sin superposiciones)
     Cada nodo reserva un espacio vertical igual a la altura de
     todos sus descendientes visibles; así nunca se pisan.
     ========================================================== */
  function separacionVertical(prof) {
    return AJUSTES.separacionV[Math.min(prof, AJUSTES.separacionV.length - 1)];
  }

  function calcularAltura(n) {
    if (!n.expandido || n.hijos.length === 0) {
      n.sub = n.h;
      n.sumaHijos = 0;
      return n.sub;
    }
    let suma = 0;
    n.hijos.forEach(function (h) { suma += calcularAltura(h); });
    suma += separacionVertical(n.prof + 1) * (n.hijos.length - 1);
    n.sumaHijos = suma;
    n.sub = Math.max(n.h, suma);
    return n.sub;
  }

  function ocultarDescendientes(n) {
    n.hijos.forEach(function (h) {
      h.visible = false;
      h.tx = n.tx;   // al ocultarse, vuelven hacia su padre
      h.ty = n.ty;
      ocultarDescendientes(h);
    });
  }

  // Coloca una lista de hijos en columna, a un lado del nodo padre
  function colocarHijos(padre, lista, lado) {
    if (!lista.length) return;
    const sep = separacionVertical(padre.prof + 1);
    const sepH = compacto ? AJUSTES.separacionHCompacta : AJUSTES.separacionH;
    let total = 0;
    lista.forEach(function (h) { total += h.sub; });
    total += sep * (lista.length - 1);

    let cursor = padre.ty - total / 2;
    lista.forEach(function (h) {
      h.tx = padre.tx + lado * (padre.w / 2 + sepH + h.w / 2);
      h.ty = cursor + h.sub / 2;
      ubicar(h);
      cursor += h.sub + sep;
    });
  }

  function ubicar(n) {
    n.visible = true;
    if (!n.expandido) {
      ocultarDescendientes(n);
      return;
    }
    if (n === raiz) {
      // Del centro salen ramas hacia la izquierda y hacia la derecha
      [-1, 1].forEach(function (lado) {
        colocarHijos(n, n.hijos.filter(function (h) { return h.lado === lado; }), lado);
      });
    } else {
      colocarHijos(n, n.hijos, n.lado);
    }
  }

  function calcularDistribucion() {
    raiz.tx = 0;
    raiz.ty = 0;
    raiz.hijos.forEach(calcularAltura);
    ubicar(raiz);
  }

  /* ==========================================================
     4.6 DIBUJO (posiciones, líneas y cámara)
     ========================================================== */
  function curva(padre, hijo) {
    const lado = hijo.lado;
    const x1 = padre.x + lado * padre.w / 2;
    const y1 = padre.y;
    const x2 = hijo.x - lado * hijo.w / 2;
    const y2 = hijo.y;
    const mx = (x1 + x2) / 2;
    return 'M' + x1 + ',' + y1 + ' C' + mx + ',' + y1 + ' ' + mx + ',' + y2 + ' ' + x2 + ',' + y2;
  }

  function pintarNodos() {
    nodos.forEach(function (n) {
      n.el.style.transform = 'translate(' + (n.x - n.w / 2) + 'px,' + (n.y - n.h / 2) + 'px)';
      if (n.linea) n.linea.setAttribute('d', curva(n.padre, n));
    });
  }

  function aplicarCamara() {
    mundo.style.transform = 'translate(' + camara.x + 'px,' + camara.y + 'px) scale(' + camara.k + ')';
  }

  function limitar(valor, min, max) {
    return Math.max(min, Math.min(max, valor));
  }

  function suavizar(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Animación de los nodos hacia su posición de destino
  let animacionNodos = 0;
  function animarNodos(conAnimacion) {
    cancelAnimationFrame(animacionNodos);
    const duracion = (conAnimacion && !menosMovimiento) ? AJUSTES.duracion : 0;
    const desde = nodos.map(function (n) { return [n.x, n.y]; });
    const inicio = performance.now();

    function paso(ahora) {
      const p = duracion ? Math.min(1, (ahora - inicio) / duracion) : 1;
      const e = suavizar(p);
      nodos.forEach(function (n, i) {
        n.x = desde[i][0] + (n.tx - desde[i][0]) * e;
        n.y = desde[i][1] + (n.ty - desde[i][1]) * e;
      });
      pintarNodos();
      if (p < 1) animacionNodos = requestAnimationFrame(paso);
    }
    if (duracion) animacionNodos = requestAnimationFrame(paso);
    else paso(inicio);
  }

  // Animación suave de la cámara (zoom + desplazamiento)
  let animacionCamara = 0;
  function moverCamara(destino, conAnimacion) {
    cancelAnimationFrame(animacionCamara);
    if (!conAnimacion || menosMovimiento) {
      camara.x = destino.x; camara.y = destino.y; camara.k = destino.k;
      aplicarCamara();
      return;
    }
    // Se interpola el punto del mapa que queda en el centro de la vista
    const W = vista.clientWidth / 2, H = vista.clientHeight / 2;
    const k0 = camara.k, k1 = destino.k;
    const c0 = { x: (W - camara.x) / k0, y: (H - camara.y) / k0 };
    const c1 = { x: (W - destino.x) / k1, y: (H - destino.y) / k1 };
    const inicio = performance.now();

    function paso(ahora) {
      const p = Math.min(1, (ahora - inicio) / AJUSTES.duracion);
      const e = suavizar(p);
      const k = Math.exp(Math.log(k0) + (Math.log(k1) - Math.log(k0)) * e);
      const cx = c0.x + (c1.x - c0.x) * e;
      const cy = c0.y + (c1.y - c0.y) * e;
      camara.k = k;
      camara.x = W - cx * k;
      camara.y = H - cy * k;
      aplicarCamara();
      if (p < 1) animacionCamara = requestAnimationFrame(paso);
    }
    animacionCamara = requestAnimationFrame(paso);
  }

  function detenerCamara() {
    cancelAnimationFrame(animacionCamara);
  }

  /* ==========================================================
     4.7 ZOOM AUTOMÁTICO (encuadre)
     ========================================================== */
  function cajaDe(lista) {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    lista.forEach(function (n) {
      x1 = Math.min(x1, n.tx - n.w / 2);
      x2 = Math.max(x2, n.tx + n.w / 2);
      y1 = Math.min(y1, n.ty - n.h / 2);
      y2 = Math.max(y2, n.ty + n.h / 2);
    });
    return { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, w: x2 - x1, h: y2 - y1 };
  }

  // Espacio que ocupa la tarjeta (para no tapar los nodos con ella)
  function espacioTarjeta() {
    if (!hojaAbierta) return { derecha: 0, abajo: 0 };
    if (compacto) return { derecha: 0, abajo: tarjeta.offsetHeight + 14 };
    return { derecha: tarjeta.offsetWidth + 24, abajo: 0 };
  }

  function camaraPara(caja) {
    const reservado = espacioTarjeta();
    const ancho = vista.clientWidth - reservado.derecha;
    const alto = vista.clientHeight - reservado.abajo;
    const m = AJUSTES.margen;
    let k = Math.min((ancho - 2 * m) / caja.w, (alto - 2 * m) / caja.h, AJUSTES.zoomAutoMax);
    k = limitar(k, AJUSTES.zoomMin, AJUSTES.zoomMax);
    return {
      k: k,
      x: ancho / 2 - caja.cx * k,
      y: alto / 2 - caja.cy * k
    };
  }

  // Decide qué parte del mapa mostrar según el nivel actual
  function encuadrar(conAnimacion) {
    let lista;
    if (hojaAbierta) {
      lista = [hojaAbierta.padre].concat(hojaAbierta.padre.hijos);
    } else if (modoTodo || foco === raiz) {
      lista = nodos.filter(function (n) { return n.visible; });
    } else {
      lista = [foco].concat(foco.hijos);
    }
    moverCamara(camaraPara(cajaDe(lista)), conAnimacion);
  }

  /* ==========================================================
     4.8 ESTADOS VISUALES (visible, atenuado, foco)
     ========================================================== */
  function actualizarEstados() {
    // Nodos protagonistas: el camino hasta el foco y sus hijos
    const activos = new Set();
    if (!modoTodo && foco !== raiz) {
      let a = foco;
      while (a) { activos.add(a); a = a.padre; }
      foco.hijos.forEach(function (h) { activos.add(h); });
    }

    let orden = 0;
    nodos.forEach(function (n) {
      const yaVisible = n.el.classList.contains('es-visible');
      // Aparición progresiva: los nodos nuevos entran uno tras otro
      if (n.visible && !yaVisible && !menosMovimiento) {
        n.el.style.transitionDelay = (120 + Math.min(orden++, 14) * 45) + 'ms';
      } else {
        n.el.style.transitionDelay = '0ms';
      }

      const atenuado = n.visible && activos.size > 0 && !activos.has(n);
      n.el.classList.toggle('es-visible', n.visible);
      n.el.classList.toggle('es-atenuado', atenuado);
      n.el.classList.toggle('es-foco', n === foco && foco !== raiz && !modoTodo);
      n.el.classList.toggle('es-seleccionado', n === hojaAbierta);
      n.el.tabIndex = n.visible ? 0 : -1;

      if (n.signo) {
        n.signo.textContent = n.expandido ? '−' : '+';
        n.el.setAttribute('aria-expanded', String(n.expandido));
      }

      if (n.linea) {
        n.linea.classList.toggle('es-visible', n.visible);
        n.linea.classList.toggle('es-atenuada', atenuado);
      }
    });
  }

  /* ==========================================================
     4.9 INDICADOR DE NIVEL, RUTA Y BOTONES
     ========================================================== */
  function camino(n) {
    const lista = [];
    while (n) { lista.unshift(n); n = n.padre; }
    return lista;
  }

  function actualizarBarra() {
    const ruta = camino(foco);
    migas.innerHTML = '';

    ruta.forEach(function (n, i) {
      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'mm-miga-sep';
        sep.textContent = '›';
        sep.setAttribute('aria-hidden', 'true');
        migas.appendChild(sep);
      }
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mm-miga';
      b.textContent = n === raiz ? 'Mapa general' : n.titulo;
      if (n !== raiz) b.style.setProperty('--c', n.color);
      if (n === foco && !hojaAbierta) b.setAttribute('aria-current', 'location');
      b.addEventListener('click', function () {
        if (n === raiz) irAlMapaGeneral();
        else enfocar(n);
      });
      migas.appendChild(b);
    });

    if (hojaAbierta) {
      const sep = document.createElement('span');
      sep.className = 'mm-miga-sep';
      sep.textContent = '›';
      migas.appendChild(sep);
      const actual = document.createElement('span');
      actual.className = 'mm-miga-hoja';
      actual.textContent = hojaAbierta.titulo;
      migas.appendChild(actual);
    }

    if (modoTodo) {
      indicadorNivel.textContent = 'Vista completa';
    } else {
      indicadorNivel.textContent = 'Nivel ' + (hojaAbierta ? ruta.length + 1 : ruta.length);
    }

    const enInicio = !hojaAbierta && !modoTodo && foco === raiz;
    btnGeneral.disabled = enInicio;
    btnAtras.disabled = enInicio;

    btnExpandirTexto.textContent = modoTodo ? 'Contraer todo' : 'Expandir todo';
    btnExpandirIcono.textContent = modoTodo ? '⊖' : '⊕';
    btnExpandir.title = modoTodo ? 'Contraer todas las ramas' : 'Expandir todas las ramas';
    btnExpandir.setAttribute('aria-label', btnExpandir.title);
  }

  /* ==========================================================
     4.10 ACTUALIZACIÓN GENERAL
     ========================================================== */
  function actualizar(conAnimacion) {
    const animar = conAnimacion !== false;
    calcularDistribucion();
    actualizarEstados();
    actualizarBarra();
    animarNodos(animar);
    encuadrar(animar);
  }

  /* ==========================================================
     4.11 NAVEGACIÓN ENTRE NIVELES
     ========================================================== */
  function contraerTodo() {
    nodos.forEach(function (n) { n.expandido = false; });
    raiz.expandido = true;
  }

  // Explora un nodo: se abre su camino y se cierran las demás ramas
  function enfocar(n) {
    modoTodo = false;
    cerrarTarjeta(false);
    contraerTodo();
    let a = n;
    while (a) {
      if (a.hijos.length) a.expandido = true;
      a = a.padre;
    }
    foco = n;
    actualizar();
  }

  function irAlMapaGeneral() {
    modoTodo = false;
    cerrarTarjeta(false);
    contraerTodo();
    foco = raiz;
    actualizar();
  }

  function nivelAnterior() {
    if (hojaAbierta) {
      cerrarTarjeta(true);
    } else if (modoTodo) {
      irAlMapaGeneral();
    } else if (foco !== raiz) {
      enfocar(foco.padre);
    }
  }

  function alternarExpandirTodo() {
    if (modoTodo) {
      irAlMapaGeneral();
      return;
    }
    modoTodo = true;
    cerrarTarjeta(false);
    nodos.forEach(function (n) { n.expandido = n.hijos.length > 0; });
    foco = raiz;
    actualizar();
  }

  // Clic en un nodo
  let seArrastro = false;
  function alHacerClic(n, evento) {
    // Si el usuario estaba arrastrando el mapa, no se cuenta como clic
    if (seArrastro && evento.detail !== 0) return;

    if (n.hijos.length === 0) {           // concepto final → ficha
      abrirTarjeta(n);
      return;
    }
    if (n === raiz) {                      // nodo central → vista general
      irAlMapaGeneral();
      return;
    }
    if (modoTodo) {                        // en vista completa: abrir/cerrar libremente
      n.expandido = !n.expandido;
      actualizar();
      return;
    }
    if (n.expandido && n === foco) {       // ya abierto → contraer
      enfocar(n.padre);
    } else {
      enfocar(n);
    }
  }

  /* ==========================================================
     4.12 TARJETAS INFORMATIVAS
     ========================================================== */
  function abrirTarjeta(n) {
    hojaAbierta = n;
    const f = n.ficha || { texto: '', fechas: [], personajes: [] };

    tarjeta.style.setProperty('--c', n.color);
    tarjetaRuta.textContent = camino(n.padre)
      .filter(function (a) { return a !== raiz; })
      .map(function (a) { return a.titulo; })
      .join(' › ');
    tarjetaTitulo.textContent = n.titulo;
    tarjetaTexto.textContent = f.texto;

    tarjetaFechas.innerHTML = '';
    (f.fechas || []).forEach(function (par) {
      const li = document.createElement('li');
      const fecha = document.createElement('strong');
      fecha.textContent = par[0] + ': ';
      li.appendChild(fecha);
      li.appendChild(document.createTextNode(par[1]));
      tarjetaFechas.appendChild(li);
    });
    bloqueFechas.hidden = !(f.fechas && f.fechas.length);

    tarjetaPersonajes.innerHTML = '';
    (f.personajes || []).forEach(function (p) {
      const li = document.createElement('li');
      li.textContent = p;
      tarjetaPersonajes.appendChild(li);
    });
    bloquePersonajes.hidden = !(f.personajes && f.personajes.length);

    // Fuentes (opcional): si la ficha no las tiene, el bloque se oculta.
    if (tarjetaFuentes) {
      tarjetaFuentes.innerHTML = '';
      (f.fuentes || []).forEach(function (fu) {
        const li = document.createElement('li');
        li.textContent = fu;
        tarjetaFuentes.appendChild(li);
      });
      bloqueFuentes.hidden = !(f.fuentes && f.fuentes.length);
    }

    // Caja de imágenes (opcional): miniaturas con pie; al hacer clic se amplían.
    if (tarjetaImagenes) {
      tarjetaImagenes.innerHTML = '';
      (f.imagenes || []).forEach(function (im) {
        const fig = document.createElement('figure');
        fig.className = 'mm-imagen';
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'mm-imagen__boton';
        boton.setAttribute('aria-label', 'Ampliar imagen: ' + (im.pie || ''));
        const el = document.createElement('img');
        el.src = im.src;
        el.alt = im.pie || '';
        el.loading = 'lazy';
        el.addEventListener('error', function () { fig.remove(); });   // si no carga, se oculta
        boton.appendChild(el);
        boton.addEventListener('click', function () { abrirVisor(im); });
        fig.appendChild(boton);
        const pie = document.createElement('figcaption');
        pie.textContent = im.pie || '';
        fig.appendChild(pie);
        tarjetaImagenes.appendChild(fig);
      });
      bloqueImagenes.hidden = !(f.imagenes && f.imagenes.length);
    }

    tarjeta.scrollTop = 0;
    tarjeta.classList.add('abierta');
    tarjeta.focus({ preventScroll: true });

    actualizarEstados();
    actualizarBarra();
    encuadrar(true);
  }

  /* Visor de imagen ampliada */
  function abrirVisor(im) {
    if (!visor) return;
    visorImg.src = im.src.replace('?width=900', '?width=1600');
    visorImg.alt = im.pie || '';
    visorPie.textContent = im.pie || '';
    visorCredito.innerHTML = '';
    if (im.credito) {
      if (im.enlace) {
        const a = document.createElement('a');
        a.href = im.enlace; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = im.credito;
        visorCredito.appendChild(a);
      } else {
        visorCredito.textContent = im.credito;
      }
    }
    visor.hidden = false;
    document.body.classList.add('mm-visor-abierto');
  }

  function cerrarVisor() {
    if (!visor || visor.hidden) return;
    visor.hidden = true;
    visorImg.src = '';
    document.body.classList.remove('mm-visor-abierto');
  }

  if (visor) {
    visor.addEventListener('click', function (e) {
      if (e.target === visor || e.target.id === 'mm-visor-cerrar') cerrarVisor();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarVisor();
    });
  }

  function cerrarTarjeta(reencuadrar) {
    if (!hojaAbierta) return;
    const anterior = hojaAbierta;
    hojaAbierta = null;
    tarjeta.classList.remove('abierta');
    if (reencuadrar) {
      actualizarEstados();
      actualizarBarra();
      encuadrar(true);
      anterior.el.focus({ preventScroll: true });
    }
  }

  document.getElementById('mm-tarjeta-cerrar').addEventListener('click', function () {
    cerrarTarjeta(true);
  });

  /* ==========================================================
     4.13 ZOOM MANUAL Y DESPLAZAMIENTO
     ========================================================== */
  // Zoom alrededor de un punto de la vista (px, py)
  function zoomEn(factor, px, py, conAnimacion) {
    const k = limitar(camara.k * factor, AJUSTES.zoomMin, AJUSTES.zoomMax);
    const wx = (px - camara.x) / camara.k;
    const wy = (py - camara.y) / camara.k;
    const destino = { k: k, x: px - wx * k, y: py - wy * k };
    if (conAnimacion) {
      moverCamara(destino, true);
    } else {
      detenerCamara();
      camara.k = destino.k; camara.x = destino.x; camara.y = destino.y;
      aplicarCamara();
    }
  }

  document.getElementById('mm-zoom-mas').addEventListener('click', function () {
    zoomEn(1.3, vista.clientWidth / 2, vista.clientHeight / 2, true);
  });
  document.getElementById('mm-zoom-menos').addEventListener('click', function () {
    zoomEn(1 / 1.3, vista.clientWidth / 2, vista.clientHeight / 2, true);
  });
  document.getElementById('mm-zoom-ajustar').addEventListener('click', function () {
    encuadrar(true);
  });

  // Ctrl + rueda (o pellizco en el trackpad) = zoom.
  // La rueda sola sigue desplazando la página con normalidad.
  vista.addEventListener('wheel', function (e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    const r = vista.getBoundingClientRect();
    zoomEn(Math.exp(-e.deltaY * 0.0025), e.clientX - r.left, e.clientY - r.top, false);
  }, { passive: false });

  // Arrastrar con ratón o dedo; pellizcar con dos dedos
  const punteros = new Map();
  let arrastre = null;
  let pellizco = null;

  function posicionRelativa(p) {
    const r = vista.getBoundingClientRect();
    return { x: p.x - r.left, y: p.y - r.top };
  }

  function iniciarArrastre(p) {
    arrastre = { x0: p.x, y0: p.y, camX: camara.x, camY: camara.y };
  }

  function iniciarPellizco() {
    const ps = Array.from(punteros.values());
    const a = posicionRelativa(ps[0]), b = posicionRelativa(ps[1]);
    const medio = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    pellizco = {
      d0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      k0: camara.k,
      wx: (medio.x - camara.x) / camara.k,
      wy: (medio.y - camara.y) / camara.k
    };
    seArrastro = true;
    detenerCamara();
  }

  vista.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.mm-tarjeta, .mm-zoom')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (punteros.size === 1) {
      seArrastro = false;
      iniciarArrastre({ x: e.clientX, y: e.clientY });
    } else if (punteros.size === 2) {
      iniciarPellizco();
    }
  });

  vista.addEventListener('pointermove', function (e) {
    if (!punteros.has(e.pointerId)) return;
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (punteros.size >= 2 && pellizco) {
      const ps = Array.from(punteros.values());
      const a = posicionRelativa(ps[0]), b = posicionRelativa(ps[1]);
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const medio = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const k = limitar(pellizco.k0 * d / pellizco.d0, AJUSTES.zoomMin, AJUSTES.zoomMax);
      camara.k = k;
      camara.x = medio.x - pellizco.wx * k;
      camara.y = medio.y - pellizco.wy * k;
      aplicarCamara();
      return;
    }

    if (arrastre) {
      const dx = e.clientX - arrastre.x0;
      const dy = e.clientY - arrastre.y0;
      if (!seArrastro && Math.hypot(dx, dy) > 5) {
        seArrastro = true;
        detenerCamara();
        vista.classList.add('arrastrando');
        try { vista.setPointerCapture(e.pointerId); } catch (error) { /* sin captura */ }
      }
      if (seArrastro) {
        camara.x = arrastre.camX + dx;
        camara.y = arrastre.camY + dy;
        aplicarCamara();
      }
    }
  });

  function soltarPuntero(e) {
    if (!punteros.has(e.pointerId)) return;
    punteros.delete(e.pointerId);
    if (punteros.size < 2) pellizco = null;
    if (punteros.size === 1) {
      // Queda un dedo: continúa arrastrando desde su posición
      iniciarArrastre(Array.from(punteros.values())[0]);
    } else if (punteros.size === 0) {
      arrastre = null;
      vista.classList.remove('arrastrando');
    }
  }
  vista.addEventListener('pointerup', soltarPuntero);
  vista.addEventListener('pointercancel', soltarPuntero);

  /* ==========================================================
     4.14 TECLADO
     ========================================================== */
  contenedor.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hojaAbierta) {
      cerrarTarjeta(true);
    } else if (e.key === 'Backspace' && e.target.classList.contains('mm-nodo')) {
      e.preventDefault();
      nivelAnterior();
    }
  });

  btnGeneral.addEventListener('click', irAlMapaGeneral);
  btnAtras.addEventListener('click', nivelAnterior);
  btnExpandir.addEventListener('click', alternarExpandirTodo);

  /* ==========================================================
     4.15 DISEÑO RESPONSIVE
     En pantallas angostas las dos ramas se apilan a la derecha
     del nodo central para que los textos sean legibles.
     ========================================================== */
  function revisarTamano(conAnimacion) {
    const debeSerCompacto = vista.clientWidth < AJUSTES.anchoCompacto;
    if (debeSerCompacto !== compacto) {
      compacto = debeSerCompacto;
      contenedor.classList.toggle('mm--compacto', compacto);
      asignarLados();
      medir();
      actualizar(conAnimacion);
    } else {
      encuadrar(false);
    }
  }

  let esperaTamano = 0;
  function alCambiarTamano() {
    cancelAnimationFrame(esperaTamano);
    esperaTamano = requestAnimationFrame(function () { revisarTamano(false); });
  }

  /* ==========================================================
     4.16 INICIO
     ========================================================== */
  function iniciar() {
    raiz = crearNodo(DATOS_MAPA, null, null);
    foco = raiz;

    compacto = vista.clientWidth < AJUSTES.anchoCompacto;
    contenedor.classList.toggle('mm--compacto', compacto);
    asignarLados();
    medir();

    // Al principio solo se ve el nodo central…
    raiz.expandido = false;
    actualizar(false);

    // …y las ramas aparecen cuando el usuario llega a la sección
    function mostrarRamas() {
      if (raiz.expandido) return;
      raiz.expandido = true;
      actualizar(true);
    }

    if ('IntersectionObserver' in window) {
      const observador = new IntersectionObserver(function (entradas) {
        if (entradas.some(function (en) { return en.isIntersecting; })) {
          mostrarRamas();
          observador.disconnect();
        }
      }, { threshold: 0.35 });
      observador.observe(vista);
    } else {
      mostrarRamas();
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(alCambiarTamano).observe(vista);
    } else {
      window.addEventListener('resize', alCambiarTamano);
    }

    // Si alguna fuente termina de cargar más tarde, se vuelve a medir
    if (document.fonts && document.fonts.addEventListener) {
      document.fonts.addEventListener('loadingdone', function () {
        medir();
        actualizar(false);
      });
    }
  }

  // Se espera a que carguen las fuentes para medir bien los nodos
  const fuentesListas = document.fonts && document.fonts.ready
    ? document.fonts.ready
    : Promise.resolve();
  fuentesListas.then(iniciar, iniciar);
})();
