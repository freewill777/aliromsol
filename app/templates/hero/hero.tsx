/* eslint-disable unicorn/no-null */
import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion'
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import BEAddress from 'address'
import { AnimatedLetters, AnimatedText } from '~/components/animated-text'
import { MotionLinkButton } from '~/components/link-button'
import { Input } from '~/components/input'

export const Hero = () => {
  const [options, setOptions] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [option, setOption] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('')

  return (
    <header
      id='intro'
      style={{ height: '100vh' }}
      className='pt-40 
      shadow-[inset_0_-40px_15px_-10px_#ededed] 
      transition duration-300 ease-in-out 
      dark:shadow-[inset_0_-40px_15px_-10px_#171717] 
      md:bg-auto lg:pt-20 lg:pb-36 xl:py-36
      overflow-hidden'
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        message={`${option} added to list!`}
        onClose={() => setOpenSnackbar(false)}
      />
      <motion.section
        variants={{
          hidden: { transition: { staggerChildren: 0.25, delayChildren: 0.25 } },
          visible: { transition: { staggerChildren: 0.25, delayChildren: 0.25 } },
        }}
        initial='hidden'
        whileInView='visible'
        exit='hidden'
        viewport={{ once: true }}
        className='container relative'
      >
        <AnimatePresence>
          <article className='lg:max-w-[60%]'>
            <AnimatedLetters
              as='h1'
              text='ALIROM Solutions '
              className='text-5xl font-medium md:text-6xl lg:text-7xl'
              textVariants={{
                hidden: { transition: { staggerChildren: 0.015 } },
                visible: { transition: { staggerChildren: 0.015 } },
              }}
              letterVariants={{
                hidden: { opacity: 0, y: 75 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.5 },
                },
              }}
            />
            <AnimatedText
              as='h1'
              className='text-3xl font-light leading-relaxed text-dark-400 dark:text-dark-200'
              text="Sweet answers for your food industry development"
            />
          </article>
        </AnimatePresence>
        <div style={{ paddingBottom: '1em' }}>
          <div style={{ justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }} className='block md:flex'>
            <div style={{ width: '100%', marginRight: '50px', position: 'relative', display: 'flex' }}>
              <Autocomplete
                open={open}
                onChange={(_, b) => {
                  setOpen(!open);
                  setOpenSnackbar(true);
                  setOption(b)
                }}
                renderOption={(props, option) => <li {...props} style={{ fontFamily: 'Epilogue' }}>{option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}</li>}
                getOptionLabel={(option) => option.name || ""}
                fullWidth
                id="custom-input-demo"
                options={options}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref} style={{ width: '100%', marginRight: '50px' }}>
                    <Input
                      type="text" {...params.inputProps}
                      name='email'
                      label='Find Nutritional Value of a Product: '
                      placeholder='Search among 500,000 foods. Ex: apple, cheese, beef '
                      onChange={(e) => setPrompt(e)}
                    />
                  </div>
                )}
                style={{ width: '100%' }}
              />
            </div>
            <MotionLinkButton
              to='#'
              motionProps={{
                variants: {
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { ease: 'circOut', duration: 0.5 } },
                },
              }}
              className='col-span-full md:col-start-7 xl:col-start-9 sm:py-2'
              style={{ float: 'right', paddingBlockStart: '0.4em', position: 'relative' }}
              onClick={async () => {
                setLoading(true)
                await updatePrompt(
                  () => setLoading(true),
                  () => setLoading(false),
                  setOptions,
                  options,
                  prompt,
                  () => setOpen(!open)
                )
                setLoading(false)
                // setOpen(!open)
              }}
            >
              {loading ? <div style={{ width: '100px', paddingInlineStart: '20px', paddingTop: '1px' }}>
                <CircularProgress
                  size={22}
                  style={{ visibility: loading ? 'visible' : 'hidden', color: '#805b50' }}
                /></div> : <span>Search</span>}
            </MotionLinkButton>
          </div>

        </div>

      </motion.section>

    </header >
  )
}

async function updatePrompt(setTrue: any, setFalse: any, setSearchResults: any, searchResults: any, prompt: any, openModal: () => void) {
  const url = `${BEAddress}/search/food?name=${prompt}`
  setTrue()
  const data = await fetch(url)
  const json = await data.json()
  const names = json.map(element => element?.description)
  openModal()
  setSearchResults([...new Set(names)])
  setFalse()
}


async function searchDetails(setTrue: any, setFalse: any, setDetails: any, fdc_id: any) {
  const url = `${BEAddress}/search/food/fdc_id?fdc_id=${fdc_id}`
  setTrue()
  console.log('fdc_id++++', `${BEAddress}/search/food/fdc_id?fdc_id=${fdc_id}`)
  const data = await fetch(url)
  const json = await data.json()
  setDetails(json[Object.keys(json)[0]])
  setFalse()
}