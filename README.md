# generator-micronaut-ddd
[Yeoman](https://yeoman.io/) templating for generating boiler plate in a [Micronaut](https://micronaut.io/) based project.

## Getting started
This generator up front assumes that you are using Micronaut with Kotlin as the application language and Spock as the
testing framework.  It takes an opinionated approach to how to arrange the code as well as the additional libraries
being used.

It is assumed that you won't be using Hibernate for database access and will instead be using Spring's
NamedParameterJdbcTemplate.  It is also assumed that you are using Postgres for your database and Flyway for managing
your database migrations.

Obviously if this doesn't fit your desired use of Micronaut these templates won't help you out, but thanks for reading
this far!

## Installing
1. Download the Micronaut command line tool from [Micronaut Tool](https://micronaut.io/download.html) or if you are in
   an environment that supports [SDKMAN](http://sdkman.io/) use that to install it.
2. Create a micronaut project following their instructions
   1. Will be something like `mn create-app my-kotlin-app --features kotlin,spock` 
3. Execute `npm init` and go through the setup
4. Execute `npm i --save-dev generator-micronaut-ddd`

## Using
1. Initialize `npx yo generator-micronaut-ddd`
2. Create a domain `npx yo generator-micronaut-ddd:domain NewDomain [ ExistingDomainToPutNewDomainIn ]`
3. Create a controller `npx yo generator-micornaut-ddd:controller NewDomain`
4. Create a Flyway Migration `npx yo generator-micronaut-ddd:migration table_name description [-a | --append]`

## Reasoning
This is how I lay out my Micronaut projects.  I am attempting to follow a mostly domain driven design, or at least my
own take on it.  I got tired of writing a bunch of boiler plate code for each part of the domain as I went so I created
some templates for it. Someone told me that if I had used Hibernate there wouldn't be so much of that, but I am horrible
with Hibernate so here I am. :(

This does kind of act as some sort of meta framework on top of Micrnaut.  This has the advantage of allowing me to 
be pragmatic and break out of my self imposed requirements when they don't fit perfectly.
