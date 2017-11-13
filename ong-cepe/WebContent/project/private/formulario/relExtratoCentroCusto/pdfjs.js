function demoFromHTML() {
	var pdf = new jsPDF('p', 'pt', 'letter');

    source = $('#content')[0];

    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 0,
        bottom: 05,
        left: 0,
        width:1500
    };
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width // max width of content on PDF
          //  'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            pdf.save('extrato-centro-de-custo.pdf');
        }, margins
    );
}