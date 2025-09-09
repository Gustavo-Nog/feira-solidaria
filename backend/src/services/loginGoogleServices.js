require('dotenv').config();

const bcrypt = require("bcrypt");
const prisma = require('../generated/prisma');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile); 

        let usuario = await prisma.usuario.findFirst({
          where: {
            OR: [
              { googleID: profile.id },
              { email: profile.emails[0].value }
            ]
          },
          include: { pessoa: true }
        });

        if (usuario) {
          return done(null, usuario);
        } else {
          const senhaPlaceholder = await bcrypt.hash(profile.id + Date.now(), 10);

          let novoUsuario = await prisma.usuario.create({
            data: {
              googleID: profile.id,
              nomeUsuario: profile.displayName,
              email: profile.emails[0].value,
              senha: senhaPlaceholder,
              tipo: "COMUM"
            }
          });

          novoUsuario = await prisma.usuario.update({
            where: { 
              id: novoUsuario.id 
            },
            data: {
              pessoa: { 
                create: {
                   nome: profile.displayName 
                } 
              }
            },
            include: { pessoa: true }
          });

          return done(null, novoUsuario);
        }

      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { 
        id 
      },
      include: { 
        pessoa: true 
      }
    });
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});
