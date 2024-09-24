<h1 align="center"> GERAÇÃO DE QUESTIONÁRIO AUTOMAZIADOS </h1>
<P align="center"> DISCIPLINA DE PROJETO INTEGRADOR IV 2024/2 </P>
<P align="center"> PROFESSOR HOWARD ROATTI </P>

<h4 align="center">    
 :construction:  Projeto em construção  :construction:
</h4>

## Índice 
* [Descrição do Projeto](#pushpin-descrição-do-projeto)
* [Pessoas Desenvolvedoras do Projeto](#pushpin-desenvolvedores)
* [Tecnologias utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
* [Organização do Projeto](#pushpin-organização-do-projeto)
* [Demonstração da Aplicação](#pushpin-demonstração-da-aplicação)
* [Executando a Aplicação](#pushpin-executando-a-aplicação)
* [Contato](#pushpin-contatos)

## :pushpin: Descrição do Projeto:
Inserir a descrição
<br>

## :pushpin: Desenvolvedores:
|  [<img src="https://avatars.githubusercontent.com/u/147534346?v=4" width=115><br><sub>Natalia Tayar</sub>](https://github.com/tayarnat) | [<img src="https://avatars.githubusercontent.com/u/105672201?v=4" width=115><br><sub>Wanderson Gonçalves</sub>](https://github.com/Wandersontr01) |
| :---: | :---: |

<br>


## ✔️ Tecnologias Utilizadas
| ![Java](https://github.com/Detemann/employee_manegement/assets/105672201/b6497e63-3185-4d1a-9add-265914adefe4)<br><sub>SAP CPI</sub> |  ![SQL](https://github.com/Detemann/employee_manegement/assets/105672201/4674d324-f393-4b73-b196-884608a84049)<br><sub>SQL</sub> | <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/48/intellij-icon.png" width="48" height="48"><br><sub>IntelliJ IDEA</sub> | ![Oracle Database](https://github.com/Detemann/employee_manegement/assets/105672201/bbd69044-52d4-4d8c-b756-841317d5f20c)<br><sub>Oracle Database</sub> | ![Oracle Database](https://github.com/Detemann/employee_manegement/assets/105672201/1a0f0f85-017e-4ca8-8088-9d0a7f53fe40)<br><sub>Orientação a Objetos</sub> |
| :-----: | :-----: | :-----: | :-----: | :-----: |


<br>



## :pushpin: Organização do Projeto:
- [Diagrams](DiagramaRelacional): Nesse diretório está o [diagrama relacional](DiagramaRelacional/DiagramaRelacional.pdf) (lógico) do sistema.
- [sql](com/src/main/resources/sql): Nesse diretório estão os scripts para criação das tabelas e inserção de dados fictícios para testes do sistema.
  * Certifique-se de que o usuário do banco possui todos os privilégios antes de executar os scripts de criação, caso ocorra erro, execute o comando a seguir com o superusuário via SQL Developer: `GRANT ALL PRIVILEGES TO LABDATABASE;`
  * [CreateTables.sql](com/src/main/resources/sql/CreateTables.sql): script responsável pela criação das tabelas.
  * [AlterTabela.sql](com/src/main/resources/sql/AlterTable.sql): script responsável pela criação dos relacionamentos.
  * [InsertData.sql](com/src/main/resources/sql/InsertData.sql): script responsável pela inserção dos registros fictícios para testes do sistema.
- [main](com/src/main/java/sarrussys/main): Nesse diretório estão os scripts do sistema:
  * [Conexão](com/src/main/java/sarrussys/main/database/ConexaoDB.java): Nesse repositório encontra-se o [módulo](com/src/main/java/sarrussys/main/database/ConexaoDB.java) de conexão com o banco de dados Oracle.
    - Exemplo de utilização para consultas simples:<br>
      ```Java
       public List<String> relatorioDepartamentoChefe(){
        List<String> resultado = new ArrayList<>();
        try {
            ResultSet consulta = this.databaseServices.fazerConsulta("SELECT DEPARTAMENTO.NOME AS Nome_Departamento, FUNCIONARIO.NOME AS Nome_Chefe\n" +
                    "FROM DEPARTAMENTO\n" +
                    "LEFT JOIN FUNCIONARIO ON DEPARTAMENTO.ID_CHEFE = FUNCIONARIO.ID_FUNCIONARIO");
            while(consulta.next()) {
                resultado.add(consulta.getString("NOME_DEPARTAMENTO"));
                resultado.add(consulta.getString("NOME_CHEFE"));
            }
            if(!resultado.isEmpty()){
                return resultado;
            }else{
                return null;
            }
        }catch (SQLException e) {
            System.out.println("[RelatorioService] Ocorreu um erro inesperado: /n"+e.getMessage());
            return null;
        }
      }
   
  
  * [Modelos](com/src/main/java/sarrussys/main/model): Nesse diretório encontram-ser as classes das entidades descritas no diagrama relacional.<br>
  * [Services](com/src/main/java/sarrussys/main/services): Nesse diretório encontra-se a [classe](com/src/main/java/sarrussys/main/services/RelatorioServices.java) responsável por gerar todos os relatórios do sistema.<br>
  * [controller](com/src/main/java/sarrussys/main/controllers): Nesse diretório encontram-sem as classes controladoras, responsáveis por realizar inserção, alteração e exclusão dos registros das tabelas.
<br>

## :pushpin: Demonstração da Aplicação

Assista a demonstrações em vídeo da aplicação para entender seu funcionamento. Clique nos links abaixo para acessar os vídeos:

- [![Video_Demonstracao: Video](https://img.shields.io/badge/-Video_Completo-red?style=flat-square&logo=Youtube&logoColor=white)](https://www.youtube.com/watch?v=JYDa-CZDsbU&ab_channel=Wandersontr)

- [![Video_Demonstracao: Video](https://img.shields.io/badge/-Relatorios-red?style=flat-square&logo=Youtube&logoColor=white)](https://youtu.be/JYDa-CZDsbU?t=81)
  
- [![Video_Demonstracao: Video](https://img.shields.io/badge/-Inserir_Registros-red?style=flat-square&logo=Youtube&logoColor=white)](https://youtu.be/JYDa-CZDsbU?t=117)

- [![Video_Demonstracao: Video](https://img.shields.io/badge/-Remover_Registros-red?style=flat-square&logo=Youtube&logoColor=white)](https://youtu.be/JYDa-CZDsbU?t=223)

- [![Video_Demonstracao: Video](https://img.shields.io/badge/-Atualizar_Registros-red?style=flat-square&logo=Youtube&logoColor=white)](https://youtu.be/JYDa-CZDsbU?t=243)


## :pushpin: Executando a Aplicação

**Sobre a Aplicação:**
O Sistema de Controle de Funcionários é uma aplicação para gerenciar informações de funcionários em uma organização. Siga as etapas abaixo para executar a aplicação.

### Passo 1: Download do Arquivo .JAR

- Faça o download do arquivo .JAR clicando [aqui](https://github.com/Detemann/employee_manegement/releases/download/Release/SistemaControleFuncionarios.jar).
- Certifique-se de que o arquivo seja baixado na pasta de downloads ou em um local de fácil acesso.

### Passo 2: Instale o Java

- Para executar o Sistema de Controle de Funcionários, você precisa ter o **Java 11 ou uma versão superior** instalada no seu sistema.
- Caso você não tenha o Java instalado, você pode fazer o download do Java [aqui](https://www.java.com/pt-BR/download/manual.jsp).

### Passo 3: Executando a Aplicação

- Abra o terminal ou prompt de comando no seu sistema.
- Navegue até a pasta onde o arquivo .JAR foi baixado. Você pode fazer isso usando o comando "cd" para mudar o diretório.
- Execute o seguinte comando para iniciar a aplicação:
   ```shell
   ~$ java -jar SistemaControleFuncionarios.jar
   ```
 
 Isso iniciará a aplicação de controle de funcionários. Siga as instruções na interface da aplicação para começar a gerenciar as informações dos funcionários.

### Problemas Comuns e Soluções:

  - PROBLEMA: Erro de compatibilidade Java
     * Certifique-se de que você está usando o Java 11 ou uma versão superior. Você pode verificar a versão do Java no terminal com o comando java -version.



## :pushpin: Contatos:
| <img src="https://avatars.githubusercontent.com/u/147534346?v=4" width=115><br><sub>Natalia Tayar</sub><br> [![Linkedin: Natalia](https://img.shields.io/badge/-Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/natalia-tayar-302577251/) [![Hotmail: Lucas](https://img.shields.io/badge/-Email-blue?%23E4405F?style=flat-square&logo=microsoftoutlook&logoColor=white)](mailto:natalia.tayar@aluno.faesa.br) | <img src="https://avatars.githubusercontent.com/u/105672201?v=4" width=115><br><sub>Wanderson Gonçalves</sub><br> [![Linkedin: Wanderson](https://img.shields.io/badge/-Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/wandersonfg/) [![Hotmail: Wanderson](https://img.shields.io/badge/-Email-blue?%23E4405F?style=flat-square&logo=microsoftoutlook&logoColor=white)](mailto:wanderson.f.g@hotmail.com) |
| :---: | :---: | 
