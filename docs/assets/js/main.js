var ICE = ICE || {};

var App = (function() {

    var App = function() {
        var self = this;
        if (!(self instanceof App)) {
            return new App();
        }

        self.templates = {
            companyTableTr: null,
            companyTableTd: null,
            companyTableCard: null
        };
        self.templateSelectors = {
            companyTableTr: '#js-template-company-table-tr',
            companyTableTd: '#js-template-company-table-td',
            companyTableCard: '#js-template-company-table-card'
        };
        self.elements = {
            companyTable: null,
        };
        self.selectors = {
            companyTable: '.js-company-table'
        };
    };

    var p = App.prototype;

    p.init = function(rootElement) {
        var self = this;

        rootElement = rootElement || $(document);

        self.elements.companyTable = rootElement.find(self.selectors.companyTable);

        self.templates.companyTableTr = $(rootElement.find(self.templateSelectors.companyTableTr).html());
        self.templates.companyTableTd = $(rootElement.find(self.templateSelectors.companyTableTd).html());
        self.templates.companyTableCard = $(rootElement.find(self.templateSelectors.companyTableCard).html());

        self.renderTable();
    };

    p.renderTable = function() {
        var self = this;

        var companies = ICE.data.getCompanies();
        if (! companies) { return; }

        var $table = self.elements.companyTable;

        companies.forEach(function(company) {
            var $tr = self.templates.companyTableTr.clone(true);
            var $td = self.templates.companyTableTd.clone(true);
            var $card = self.templates.companyTableCard.clone(true);

            $card.find('[data-element="name"]').text(company['事業場名称']);
            $card.find('[data-element="address"]').text(company['所在地']);
            $card.find('[data-element="publishedAt"]').text(company['公表日']);
            $card.find('[data-element="violation"]').text(company['違反法条']);
            $card.find('[data-element="description"]').text(company['事案概要']);
            $card.find('[data-element="note"]').text(company['その他参考事項']);

            var $tdId = $td.clone(true);
            $tdId.append(company['id'])
                .addClass('text-right');

            $tr.append($tdId)
                .append($td.clone(true).append($card));

            $table.append($tr);

            console.log(company);
        });
    };

    return App;
})();

ICE.app = new App();

$(function() {
    ICE.app.init();	
});
