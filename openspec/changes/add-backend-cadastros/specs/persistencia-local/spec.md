## MODIFIED Requirements

### Requirement: Seed inicial a partir dos dados de exemplo
O sistema SHALL, quando o banco de dados do backend não possui nenhum dado persistido, populá-lo com os dados de exemplo (3 clientes fictícios com 2–3 avaliações cada e coeficientes padrão), disponíveis para todos os navegadores e dispositivos que acessem o backend.

#### Scenario: Primeira visita
- **WHEN** o backend é inicializado com um banco de dados vazio
- **THEN** os 3 clientes de exemplo e suas avaliações ficam disponíveis imediatamente para qualquer cliente da API, sem cadastro manual

### Requirement: Persistência de dados criados ou editados
O sistema SHALL persistir, através do backend, qualquer aluna cadastrada, avaliação criada ou coeficiente editado, de forma que essas mudanças sobrevivam a um recarregamento da página e fiquem disponíveis em qualquer navegador ou dispositivo que acesse o mesmo backend.

#### Scenario: Nova avaliação sobrevive a reload
- **WHEN** Bárbara cria uma nova avaliação e a página é recarregada
- **THEN** a avaliação criada continua disponível no histórico da aluna

#### Scenario: Nova avaliação visível em outro dispositivo
- **WHEN** Bárbara cria uma nova avaliação em um dispositivo e acessa o sistema a partir de outro dispositivo
- **THEN** a avaliação criada aparece no histórico da aluna também no segundo dispositivo

## ADDED Requirements

### Requirement: Dependência de conectividade com o backend
O sistema SHALL exigir uma conexão funcional com o backend para ler ou persistir clientes, avaliações e configurações; quando essa conexão falhar, o sistema SHALL informar o erro ao usuário em vez de exibir dados desatualizados ou falhar silenciosamente.

#### Scenario: Backend indisponível
- **WHEN** o frontend tenta carregar a lista de clientes e o backend não responde
- **THEN** o sistema exibe uma indicação de erro ao usuário, em vez de uma lista vazia ou desatualizada sem explicação
