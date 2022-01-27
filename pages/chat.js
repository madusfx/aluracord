import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwOTM2MCwiZXhwIjoxOTU4ODg1MzYwfQ.K86iUMZzywgO7LpsFiUKksvjwjpziGRm8cTD7bd2qnM';
const SUPABASE_URL = 'https://bdsfimngsrbulrrglvgn.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
      supabaseClient
        .from('messages')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data }) => {
          console.log('Dados da consulta:', data);
          setMessageList(data);
        })
    }, []);

    function handleNewMessage(newMessage) {
        const message = {
            from: 'madusfx',
            text: newMessage,
        };

        supabaseClient
          .from('messages')
          .insert([
            message
          ])
          .then((data) => {
            console.log('criando mensahgem', data);
            setMessageList([
              data.data[0],
              ...messageList,
          ]);
          })
          setMessage('');
    }

    function deleteMessage(currentMessage) {
      supabaseClient
        .from('messages')
        .delete()
        .match({id: currentMessage.id})
        .then(({data}) => {
          const messagesListFiltered = messageList.filter((message) => {
            return message.id != data[0].id
          });
          setMessageList(messagesListFiltered);
        });
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
          <MessageList mensagens={messageList} deleteMessage={deleteMessage}/>
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
  const deleteMessage = props.deleteMessage;

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
        overflow: 'auto',
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
                src={`https://github.com/${message.from}.png`}
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
              <Button 
                styleSheet={{
                  borderRadius: '25%',
                  width: '12px',
                  marginLeft: '8px'
                }}
                variant='tertiary'
                colorVariant='dark'
                label={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>}
                buttonColors={{
                  mainColor: appConfig.theme.colors.primary['100'],
                }}
                onClick={(event) => {
                  event.preventDefault()
                  deleteMessage(message)
                }}
              />
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
    )
}