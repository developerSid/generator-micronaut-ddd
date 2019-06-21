'use script';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelCase = require('camel-case');
const dotCase = require('dot-case');

module.exports = class extends Generator {
   constructor(args, opts) {
      super(args, opts);
   }

   async prompting() {
      this.log(
         yosay(`Welcome to the ${chalk.red('Micronaut domain')} boilerplate generator`)
      );
      const questions = [{
         type: 'input',
         name: 'name',
         message: 'What is the name of your project?',
         store: true
      }, {
         type: 'input',
         name: 'basePkg',
         message: 'What is the base package?',
         store: true
      }, {
         type: 'input',
         name: 'lob',
         message: "What is the name of this line of business?",
         store: true
      }];

      this.answers = await this.prompt(questions);

      for(let i = 0; i < questions.length; i++) {
         const question = questions[i];
         const key = question.name;
         const value = this.answers[key];

         this.config.set(key, value);
         this.config.save();
      }

      this.config.save();
   }

   writing() {
      const appName = this.config.get('name');
      const lineOfBusiness = this.config.get('lob');
      const pkg = this.config.get('basePkg');
      const pkgPath = pkg.replace(/\./gi, '/');
      const templateValues = {
         appName: appName,
         lineOfBusiness: lineOfBusiness,
         pkg: pkg
      };

      const templates = {
         'test/groovy/infrastructure/ControllerSpecificationBase.groovy.template': `src/test/groovy/${pkgPath}/domain/infrastructure/ControllerSpecificationBase.groovy`,
         'test/groovy/infrastructure/ServiceSpecificationBase.groovy.template': `src/test/groovy/${pkgPath}/domain/infrastructure/ServiceSpecificationBase.groovy`,
         'test/groovy/infrastructure/TestingExtensions.groovy.template': `src/test/groovy/${pkgPath}/domain/infrastructure/TestingExtensions.groovy`,
         'test/resources/META-INF/services/org.codehaus.groovy.runtime.ExtensionModule.template': `src/test/resources/META-INF/services/org.codehaus.groovy.runtime.ExtensionModule`,
         'test/resources/application-test.yml': `src/test/resources/application-test.yml`,
         'test/resources/logback-test.xml': `src/test/resources/logback-test.xml`,
         'main/kotlin/IdentifiableValueObject.kt.template': `src/main/kotlin/${pkgPath}/domain/IdentifiableValueObject.kt`,
         'main/kotlin/IdentifiableEntity.kt.template': `src/main/kotlin/${pkgPath}/domain/IdentifiableEntity.kt`,
         'main/kotlin/Entity.kt.template': `src/main/kotlin/${pkgPath}/domain/Entity.kt`,
         'main/kotlin/Page.kt.template': `src/main/kotlin/${pkgPath}/domain/Page.kt`,
         'main/kotlin/PageRequest.kt.template': `src/main/kotlin/${pkgPath}/domain/PageRequest.kt`,
         'main/kotlin/SimpleIdentifiableEntity.kt.template': `src/main/kotlin/${pkgPath}/domain/SimpleIdentifiableEntity.kt`,
         'main/kotlin/TypeDomainEntity.kt.template': `src/main/kotlin/${pkgPath}/domain/TypeDomainEntity.kt`,
         'main/kotlin/TypeDomainService.kt.template': `src/main/kotlin/${pkgPath}/domain/TypeDomainService.kt`,
         'main/kotlin/ValueObject.kt.template': `src/main/kotlin/${pkgPath}/domain/ValueObject.kt`,
         'main/kotlin/ValueObjectBase.kt.template': `src/main/kotlin/${pkgPath}/domain/ValueObjectBase.kt`,
         'main/kotlin/infrastructure/IdentifiableService.kt.template': `src/main/kotlin/${pkgPath}/domain/infrastructure/IdentifiableService.kt`,
         'main/kotlin/infrastructure/Repository.kt.template': `src/main/kotlin/${pkgPath}/domain/infrastructure/Repository.kt`,
         'main/kotlin/infrastructure/RepositoryPage.kt.template': `src/main/kotlin/${pkgPath}/domain/infrastructure/RepositoryPage.kt`,
         'main/kotlin/infrastructure/TypeDomainRepository.kt.template': `src/main/kotlin/${pkgPath}/domain/infrastructure/TypeDomainRepository.kt`,
      };

      this.log(`Generating Domain ${chalk.green(lineOfBusiness)}`);

      Object.keys(templates).forEach((key) => {
         const templateFile = key;
         const destDir = templates[key];

         this.fs.copyTpl(
             this.templatePath(templateFile),
             this.destinationPath(destDir),
             templateValues
         );
      });
   }

   static determineDomainPackage(existing, domain) {
      let toReturn;

      if (existing != null && existing.length > 3) {
         toReturn = existing;
      } else {
         toReturn = domain;
      }

      return dotCase(camelCase(toReturn))
   }
};
