#API

##Environnement

Il existe deux façon de connaitre l'environnement de notre app:

```
process.env.NODE_ENV; //with node
app.get('env'); //with express
```
Pour setter l'environnnement depuis la ligne de commande:

```
export NODE_ENV=production
```
