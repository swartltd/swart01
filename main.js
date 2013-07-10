function bottomTabBar() {
	return 	{ view: 'toolbar', 
		elements: [
			{ view: 'tabbar', selected: 'tab_eleves', multiview : true,
				options: [
					{ id: 'tb1_eleve'	, label: 'Elèves'	, src: './imgs/grid.png'	, srcSelected: './imgs/grid.png'	, key: '1', value:'tab_eleves'	},
					{ id: 'tb1_planning', label: 'Planning'	, src: './imgs/planning.png', srcSelected: './imgs/planning.png', key: '2', value:'tab_fiche_eleve'},
					{ id: 'tb1_stage'	, label: 'Stage'	, src: './imgs/stages.png'	, srcSelected: './imgs/stages.png'	, key: '3', value:'tab_stages'	}
				], id: 'mainTabBar'
			}
		]
	};
}
function tbBackSearch() {
	return { view: 'toolbar', 
		elements: [
			{ view: 'button', label: 'Retour', type: 'prev'},
			{ view: 'input', label: '', popup: '', click: '', maxlength: '', disabled: false, placeholder: '', css: '', type: 'text'},
			{ view: 'button', label: 'Chercher', click:"connection();"}
		]
	};
}
function liste_eleves() {
	return { id:'tab_eleves', view: 'list', 
		url:"serverside/data/sample_list.json", datatype:"json",  type: { height: 22 },
		type:{
			height: 18, padding: 2,
			template:"<span style='color:#67B802; font-style:italic'><small> #value# </small></span> - <span style='color:#707070; font-weight:normal'> #option#</span>" 
		}
	};
}
function iniFlash() {
	var rows=[];
	rows.push({ view: 'label'		, label: 'Initialisation' });
	if (window.idsession && window.iduser) {
		rows.push({ view: 'label'	, label: 'Session initialisée, connectée.' });
		rows.push({ view: 'label'	, label: window.nomuser });
		rows.push({ view: 'button'	, label: 'réInitialiser', type:'prev', click: 'main()'});
	}
	else if (window.idsession) {
		rows.push({ view: 'label'	, label: 'Session initialisée, non connectée' });
		rows.push({ view: 'button'	, label: 'Connection', type:'next', click: 'connection()'});
	}
	else {
		rows.push({ view: 'label'	, label: 'Session non initialisée' });
		rows.push({ view: 'button'	, label: 'réessayer', type:'prev', click: 'main()'});
	}
	rows.push( { view: 'label'		, label: 'nav.appCodeName: '+navigator.appCodeName });
	rows.push( { view: 'label'		, label: 'nav.appName: '+navigator.appName });
	rows.push( { view: 'label'		, label: 'nav.platform: '+navigator.platform });
	rows.push( { view: 'label'		, label: 'nav.userAgent: '+navigator.userAgent });
	rows.push( { view: 'label'		, label: 'Appareil: '+window.context });
	rows.push( { view: 'button'	, label: 'simulation', click: 'Entree()'});
	if ($$('app')) $$('app').destructor();
	dhx.ready(dhx.ui({ id: 'app', view: 'layout', height: 482, width: 321, rows: rows }));
}
var app = {
    // Application Constructor
    initialize: function() { this.bindEvents();  },
    bindEvents: function() {
        window.context="WebBrowser ?";
		var x=document.addEventListener('deviceready', this.onDeviceReady, false);
		dhx.ajax(window.serverside+'sessions/init.php', this.onSessionInit);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
		window.context="smartApp";
		iniFlash();
    },
	onSessionInit:function(text) {
		var data; eval("data="+text);
		window.iduser=0;
		window.idsession=data.idsession;
		//checkConnection();
		iniFlash();
	}
};
function main() {
	app.initialize();
	iniFlash();
}
function Entree() {
	if ($$('app')) $$('app').destructor();
	dhx.ui({ id: 'app', view: 'layout', height: 482, width: 321,
		rows: [
			{ view: 'layout', type: 'wide',
				rows: [
					tbBackSearch(),	
					{ view:"multiview",
						cells:[
							liste_eleves(),
							FicheEleveEtatCivil(),
							{ id:'tab_stages', view: 'dataview', template: '#Maintainer##Package# #Version#', select: 'single', scroll: 'y', type: { height: 35, width: 137, padding: 7, margin: 0},  datatype: 'json', url: 'serverside/data/sample_dataview.json' }
						]
					},
					bottomTabBar()
				]
			}
		]
	});
}
function FicheEleveEtatCivil() {
	return { view: 'form', id:'tab_fiche_eleve', scroll: true,
		elements: [
			{ view: 'text', label: 'Nom'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_7' , inputWidth: '100%', placeholder: 'Entrez le nom'},
			{ view: 'text', label: 'Prénom'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_8' , inputWidth: '100%', placeholder: 'Entrez le prénom'},
			{ view: 'text', label: 'Adresse'	, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_9' , inputWidth: '100%', placeholder: 'Entrez l adresse'},
			{ view: 'text', label: ''			, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_10', inputWidth: '100%', placeholder: '(suite adresse)'},
			{ view: 'text', label: 'CP'			, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_11', inputWidth: '100%', placeholder: 'Code postal'},
			{ view: 'text', label: 'Ville'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_12', inputWidth: '100%', placeholder: 'Entrez la ville'},
			{ view: 'datepicker', label: 'Né le', value: '2011-01-01', dateFormat: '%d/%m/%Y', calendarMonthHeader: '%F %Y', calendarDayHeader: '%d', calendarWeek: '%W', cellAutoHeight: true, id: 'control_datepicker_2', weekHeader: 1, navigation: 1, startOnMonday: 1},
			{ view: 'text', label: 'Né à'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_13', inputWidth: '100%', placeholder: 'Ville de naissance'}
		]
	};
}
function connection() {
	if ($$('app')) $$('app').destructor();
	dhx.ui({ id: 'app', view: 'layout', height: 482, width: 322,
				rows: [
					{ view: 'label', label: 'Connection'},
					{ view: 'form', scroll: true, id:'formLogin',
						elements: [
							{ view: 'text', label: 'Dossier'		, id: 'base'		, labelPosition: 'left', labelAlign: 'left', type: 'text', placeholder: '(dossier)', inputWidth: '320', labelWidth: '110'},
							{ view: 'text', label: 'Utilisateur'	, id: 'code_acces'	, labelPosition: 'left', labelAlign: 'left', type: 'text', placeholder: '(code utilisateur)', inputWidth: '320', labelWidth: '110'},
							{ view: 'text', label: 'Mot de passe'	, id: 'mot_de_passe', labelPosition: 'left', labelAlign: 'left', type: 'password', inputWidth: '320', placeholder: '(mot de passe)', labelWidth: '110'}
						]
					},
					{ view: 'imagebutton', label: '<a href="?"><i>Mot de passe perdu/oublié</i></a>', src: './imgs/search.png'},
					{ view: 'toolbar', type: 'MainBar',
						elements: [					
							{ view: 'button', label: 'Annuler', type: 'prev'},
							{ view: 'button', label: 'Se connecter', type: 'next', click:"login()"}
						]
					}
				]
	}	);
}
function login() {
	dhx.ajax().post(window.serverside+'sessions/login.php?idsession='+window.idsession, $$("formLogin").getValues(), function(text) {
		var data; eval("data="+text);
		window.iduser=0;
		if (data.erreur) alert(data.erreur);
		else {
			window.idsession=data.idsession; 
			window.iduser=data.iduser;
			window.nomuser=data.nom;
		}
		iniFlash();		
	});
}
/*function checkConnection() {
	var networkState = navigator.network.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'Connexion inconnue';
	states[Connection.ETHERNET] = 'Connexion Ethernet';
	states[Connection.WIFI]     = 'Connexion WiFi';
	states[Connection.CELL_2G]  = 'Connexion cellulaire 2G';
	states[Connection.CELL_3G]  = 'Connexion cellulaire 3G';
	states[Connection.CELL_4G]  = 'Connexion cellulaire 4G';
	states[Connection.NONE]     = 'Pas de connexion réseau';
	alert('Type de connexion : ' + states[networkState], "<hr />");
}*/