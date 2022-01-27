import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    function handleNewMessage(newMessage) {
        const message = {
            id: messageList.length + 1,
            from: 'madusfx',
            text: newMessage,
        };

        setMessageList([
            message,
            ...messageList,
        ]);
        setMessage('');
    }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary['050'],
        backgroundImage: `url(https://1.bp.blogspot.com/-EmtBnYBUD_s/X0lscSLzcCI/AAAAAAAA13k/DTqh7nICc409HfjO_l8ERIf8A849jm9qwCLcBGAsYHQ/s2560/code_symbols_programming_183643_3840x2160.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.primary['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.primary['100'],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.primary['050'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList mensagens={messageList} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
              return (
                  <li key={mensagemAtual.id}>
                      {mensagemAtual.de}: {mensagemAtual.text}
                  </li>
              )
          })} */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                const valor = event.target.value;
                setMessage(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.primary['100'],
                marginRight: '12px',
                color: appConfig.theme.colors.primary['200'],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
            variant='tertiary'
            colorVariant='neutral'
            label='Logout'
            href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.primary['100'],
        marginBottom: '16px',
      }}
    >
      {props.mensagens.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.primary['200'],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/madusfx.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.primary['100'],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
    )
}