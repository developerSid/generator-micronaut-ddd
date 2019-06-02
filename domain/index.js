'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelCase = require('camel-case');
const pascalCase = require('pascal-case');
const dotCase = require('dot-case');
const decamelize = require('decamelize');

module.exports = class extends Generator {
   constructor(args, opts) {
      super(args, opts);

      this.argument('domain', {
         type: String,
         required: true,
         description: 'Name of the table that the Entity will be managing'
      });

      this.option('existing', {
         type: String,
         alias: 'e',
         description: 'whether to append a table to existing file or create a new one'
      });
   }

   async prompting() {
      this.log(
         yosay(
         `${chalk.green('Micronaut')} Domain boilerplate generator!`
         )
      );
   }

   writing() {
      const existing = this.options.existing;
      const domain = this.options.domain;
      const appName = this.config.get('name');
      const lineOfBusiness = this.config.get('lob');
      const pkg = this.config.get('basePkg');
      const pkgPath = pkg.replace(/\./gi, '/');
      const domainPackage = determineDomainPackage(existing, domain);
      const domainPath = domainPackage.replace(/\./gi, '/');
      const fullDomainPackage = `${pkg}.${appName}.${domainPackage}`;
      const tableName = decamelize(domain);
      const templateValues = {
         appName: appName,
         domain: pascalCase(domain),
         lineOfBusiness: lineOfBusiness,
         pkg: pkg,
         repository: camelCase(domain),
         fullDomainPackage: fullDomainPackage,
         table: tableName
      };

      console.log(`domain: ${domain}`);

      const templates = {
         'Entity.kt.template': `src/main/kotlin/${pkgPath}/${appName}/${domainPath}/${templateValues.domain}.kt`,
         'ValueObject.kt.template': `src/main/kotlin/${pkgPath}/${appName}/${domainPath}/${templateValues.domain}ValueObject.kt`,
         'Repository.kt.template': `src/main/kotlin/${pkgPath}/${appName}/${domainPath}/infrastructure/${templateValues.domain}Repository.kt`,
         'Factory.kt.template': `src/main/kotlin/${pkgPath}/${appName}/${domainPath}/${templateValues.domain}Factory.kt`,
         'Service.kt.template': `src/main/kotlin/${pkgPath}/${appName}/${domainPath}/${templateValues.domain}Service.kt`,
         'Validator.kt.template': `src/main/kotlin/${pkgPath}/${appName}/${domainPath}/${templateValues.domain}Validator.kt`,
         'ValidatorSpecification.groovy.template': `src/test/groovy/${pkgPath}/${appName}/${domainPath}/${templateValues.domain}ValidatorSpecification.groovy`,
      };

      this.log(`Generating Domain ${chalk.green(this.options.domain)}`);

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
};

function determineDomainPackage(existing, domain) {
   let toReturn;

   console.log(`existing ${existing}`);
   console.log(`domain ${domain}`);
   console.log(existing != null);

   if (existing != null && existing.length > 3) {
      console.log('first');
      toReturn = existing;
   } else {
      console.log('second');
      toReturn = domain;
   }

   console.log(`toReturn ${toReturn}`);

   return dotCase(camelCase(toReturn))
}
