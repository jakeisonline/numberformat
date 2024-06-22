import { Urbanist } from "next/font/google"

const googleFont = Urbanist({ subsets: ["latin"], weight: "700" })

export default function DefaultCard({
  fontSize = "16",
}: {
  fontSize?: string
}) {
  return (
    <div
      className={googleFont.className}
      style={{
        fontSize: fontSize,
        backgroundColor: "#fff",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
        backgroundSize: "100px 100px",
        height: "100%",
        width: "100%",
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        display: "flex",
        fontFamily: googleFont.style.fontFamily,
        fontWeight: googleFont.style.fontWeight,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-1.5em",
            paddingBottom: "1rem",
            marginLeft: "-1.5em",
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              border: "2px solid #C75527",
              borderRadius: "100%",
              marginTop: "5px",
              marginRight: "5px",
            }}
          >
            <circle cx="17" cy="17" r="15" fill="white" />
            <path
              d="M25.434 14.365H23.094L21.729 19.422H24.069L23.38 22.048H21.04L19.974 26H17.27L18.336 22.048H13.084L12.018 26H9.314L10.38 22.048H8.04L8.742 19.422H11.069L12.434 14.365H10.094L10.796 11.752H13.123L14.189 7.8H16.893L15.827 11.752H21.105L22.145 7.8H24.849L23.809 11.752H26.123L25.434 14.365ZM19.025 19.422L20.39 14.365H15.138L13.773 19.422H19.025Z"
              fill="#C75527"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: "2em",
              color: "#7D7D7D",
            }}
          >
            <div style={{}}>numberformat.app</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "5em" }}>
          <div style={{}}>Every</div>
          <div style={{ marginLeft: "1rem", color: "#c54b1b" }}>
            number format
          </div>
          <div style={{}}>,</div>
        </div>
        <div style={{ display: "flex", fontSize: "5em" }}>
          <div style={{}}>for every</div>
          <div style={{ marginLeft: "1rem", color: "#2c67f2" }}>locale</div>
        </div>
      </div>
    </div>
  )
}
