const prisma = require('../generated/prisma');
const passport = require('passport');
/*const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: process.env.CALLBACK_URL
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        const usuario = await prisma.usuario.findFirst({
          where: {
            OR: [
              { googleID: profile.id },
              { email: profile.emails[0].value }
            ],
          }
        });
        

        if (usuario) {
          return done(null, usuario);
        } else {
          const novoUsuario = await prisma.usuario.create({
            data: {
              googleID: profile.id,
              nomeUsuario: profile.displayName,
              email: profile.emails[0].value,
              tipo: "COMUM",
            },
            include: { 
              pessoa: True 
            }
          });
          await prisma.pessoa.create({
            data: {
              nome: profile.displayName,
              usuarioID: novoUsuario.id
            }
          });
          return done(null, novoUsuario);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);*/

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
      include : {
        pessoa: True
      }
    });
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});
