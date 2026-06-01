export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#002626] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl mb-4 text-accent">Mourão Consultoria Econômica</h3>
            <p className="text-white/80 text-sm">
              Maximizamos a rentabilidade e a segurança tributária da sua empresa desde 2004.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-accent">Serviços</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Estudos de Viabilidade & PPB</li>
              <li>Incentivos Estaduais e Federais</li>
              <li>Consultoria Econômica Permanente</li>
              <li>Auditoria e Consultoria Contábil</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-accent">Contato</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Rua Jorge Veiga, nº 7, Cj Eldorado</li>
              <li>Parque 10 de Novembro</li>
              <li>Manaus/AM - CEP: 69050-520</li>
              <li>atendimento@mouraoconsultores.com.br</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-8 text-center text-sm text-white/80">
          <p>© {currentYear} Mourão Consultoria Econômica. Todos os direitos reservados.</p>
          <p className="mt-2 text-accent">TOP 10 Consultorias Econômicas CORECON/AM 2022, 2023 e 2025</p>
        </div>
      </div>
    </footer>
  );
}
