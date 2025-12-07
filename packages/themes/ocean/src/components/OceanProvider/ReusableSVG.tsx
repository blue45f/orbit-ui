import React from 'react'

export const REUSABLE_SVG_ID = {
  MEDIA_PLACEHOLDER: 'reusable-svg-media-placeholder',
}

/**
 * `<symbol>`로 재사용할 SVG를 정의
 * @see - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
 */
export const ReusableSVG: React.FC = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
      <symbol id={REUSABLE_SVG_ID.MEDIA_PLACEHOLDER} viewBox='0 0 125 28' width='125' height='28'>
        <MediaPlaceholderSVG />
      </symbol>

      {/* <OtherSvg /> ... */}
    </svg>
  )
}

const MediaPlaceholderSVG = () => {
  return (
    <>
      <path d='M22.354 0v9.227h-2.97V0h-4.12v27.903h4.19l-.07-14.362h2.97v14.362h3.81V0h-3.81z' fill='#D5D7D9' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.48 2.695v5.037H3.95V2.695H0v19.472h12.538V2.695H8.48zM3.95 18.092H8.48v-5.948H3.95v5.947z'
        fill='#D5D7D9'
      />
      <path
        d='M46.79 0v15.142h4.244V9.99h3.1V5.797h-3.1V0h-4.245zM28.871 1.66v12.633h14.81v-3.447H33.113v-5.35h9.866V1.66H28.87zM30.773 16.253v2.66h15.511v1.51H30.773l.037 7.48h20.123V24.87H35.018v-1.484h15.915v-7.132h-20.16zM72.361 9.123v18.111h-3.48v-3.96C65.235 26.608 55.63 26.33 55.63 26.33v-3.154c5.941.451 11.857-1.435 13.206-1.953V9.123h3.526z'
        fill='#D5D7D9'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M62.843 10.17H59.72c-1.905 0-3.31 1.43-3.31 3.2v3.413c0 1.758 1.6 2.954 3.31 2.954h2.855c2.165 0 3.5-1.241 3.5-3.185v-3.183c0-1.769-1.265-3.2-3.233-3.2zm.352 5.754c0 .77-.596 1.35-1.382 1.35h-1.02c-.783 0-1.5-.58-1.5-1.35v-1.94c0-.75.717-1.332 1.5-1.332h1.02c.786 0 1.382.583 1.382 1.333v1.939z'
        fill='#D5D7D9'
      />
      <path
        d='M93.236 17.88h4.308V.162h-4.308V17.88zM78.029 27.684v-9.236h4.15v5.332h15.704v3.904H78.029z'
        fill='#D5D7D9'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M75.545 15.306h14.093V1.862H75.545v13.444zm4.015-3.743h6.067v-5.9H79.56v5.9z'
        fill='#D5D7D9'
      />
      <path
        d='M101.495.849h20.96v3.344h-7c1.724 2.481 4.376 3.63 6.852 4.295v2.539c-4.778-.496-7.938-2.312-10.31-4.833-2.446 2.776-7.264 4.569-10.358 5.256V8.649c3.307-.96 6.281-3.198 6.642-4.455h-6.786V.85z'
        fill='#D5D7D9'
      />
      <path
        d='M124.017 16.38v-3.72h-9.716V9.84h-4.583v2.821h-9.782v3.72h24.081zM122.598 22.015V18.18h-21.243v3.802h17.138s.168 2.777-1.414 5.722h4.139s1.38-2.41 1.38-5.689z'
        fill='#D5D7D9'
      />
    </>
  )
}
