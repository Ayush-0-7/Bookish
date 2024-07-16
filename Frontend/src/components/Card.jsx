import React from 'react'

const Card = ({title,img,author,yop}) => {
    let img2 = "https://visme.co/blog/wp-content/uploads/2021/06/the-godfather-book-cover.png"
  return (
    <div class=" rounded-md border">
    <img
      src={img=='http://images.amazon.com/images/P/0860074382.01.LZZZZZZZ.jpg'?img2 : img}
      alt="Book"
      class="h-[200px] w-full rounded-t-md object-cover"
      style={{objectFit:"fill"}}
    />
    <div class="p-4">
      <h1 class="inline-flex items-center text-lg font-semibold">
        {title} {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </h1>
      <p class="mt-3 italic text-sm text-gray-600">
        Author:{author} <br />
        Year:{yop}   
      </p>
      <div class="mt-4">
      <p class="mt-3 italic text-sm text-gray-600">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.

      </p>
      </div>
      <button
        id='read'
        type="button"
        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Read
      </button>
    </div>
  </div>
  )
}

export default Card