import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import Link from 'next/link';

function Title(props) {
  const Tag = props.tag;
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary["100"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Title tag="h2">Boas vindas de volta!</Title>
//       <h2>Discord - Alura Matrix</h2>
//     </div>
//   ) 
// };

//export default HomePage;

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const routing = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(https://1.bp.blogspot.com/-EmtBnYBUD_s/X0lscSLzcCI/AAAAAAAA13k/DTqh7nICc409HfjO_l8ERIf8A849jm9qwCLcBGAsYHQ/s2560/code_symbols_programming_183643_3840x2160.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.primary['050'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              routing.push('/chat');
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Bem vindo a sala de estudos!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary["100"] }}>
              Faça login para começar uma nova conversa.
            </Text>

            {/* <input 
              type="text"
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
            /> */}
            <TextField
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary["100"],
                  mainColor: appConfig.theme.colors.primary["100"],
                  mainColorHighlight: appConfig.theme.colors.primary["050"],
                  backgroundColor: appConfig.theme.colors.primary["050"],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.primary["100"],
                mainColor: appConfig.theme.colors.primary["200"],
                mainColorLight: appConfig.theme.colors.primary["400"],
                mainColorStrong: appConfig.theme.colors.primary["200"],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.primary["200"],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary["200"],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username.length < 3 ? '/hello-robot.png' : `https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary["200"],
                backgroundColor: appConfig.theme.colors.primary["100"],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username.length < 3 ? 'Informe seu user' :
                <Link 
                  href={`https://github.com/${username}`}
                >
                  {username}
                </Link>
            }
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}