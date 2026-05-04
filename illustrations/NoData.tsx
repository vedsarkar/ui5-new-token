import { classNames } from "@/utils/classNames";
import { Illustration } from "./Illustration";
import styles from "./Illustration.module.css";
import type { IllustrationProps } from "./Illustration.types";

export const NoData = ({
	size = "dialog",
	title = "No data",
	description = "There is nothing to display here yet.",
	...rest
}: IllustrationProps) => (
	<Illustration size={size} title={title} description={description} {...rest}>
		<svg
			className={classNames(styles.svg, styles.svgSpot)}
			viewBox="0 0 128 128"
			aria-hidden="true"
			focusable="false"
		>
			<rect
				y="40.5"
				width="128"
				height="55"
				rx="8"
				fill="var(--sapContent_Illustrative_Color20)"
			/>
			<path
				d="M95.8 77.5265L92.4661 76.5996L79.622 73.6264L69.4704 62.885L61.5098 54.6001L21 67.3884L31.8246 70.3513L29.805 74.0897L54.863 89.0001L56.3216 83.102L71.7838 88.6612L95.8 77.5265Z"
				fill="var(--sapContent_Illustrative_Color21)"
			/>
			<path
				d="M68.2 45.3999L97 54.0473L96.1039 76.9999L68.2 64.8315V45.3999Z"
				fill="var(--sapContent_Illustrative_Color16)"
			/>
			<path
				d="M45.0175 74.1999L68.2 65.0095V45.3999L43.8 51.8095L45.0175 74.1999Z"
				fill="var(--sapContent_Illustrative_Color28)"
			/>
			<path
				d="M71.8 62.7055L97 54.2L96.1019 77.401L71.8 88.6V62.7055Z"
				fill="var(--sapContent_Illustrative_Color28)"
			/>
			<path
				d="M77.1022 34.2L106.6 40.5754L96.7705 54.2L68.2 45.4588L77.1022 34.2Z"
				fill="var(--sapContent_Illustrative_Color15)"
			/>
			<path
				d="M96.9335 54.2L107 65.9449L82.5101 76.6L71.8 62.6533L96.9335 54.2Z"
				fill="var(--sapContent_Illustrative_Color3)"
			/>
			<path
				d="M68.2 45.7056L63.1018 33L38.6 38.0234L44.1302 52.2L68.2 45.7056Z"
				fill="var(--sapContent_Illustrative_Color3)"
			/>
			<path
				d="M44.9825 74.4702L71.8 88.6V62.969L43.8 52.2L44.9825 74.4702Z"
				fill="var(--sapContent_Illustrative_Color29)"
			/>
			<path
				d="M62.5186 79.8L71.8 62.8105L43.9234 52.2L35.4 66.2737L62.5186 79.8Z"
				fill="var(--sapContent_Illustrative_Color15)"
			/>
		</svg>
		<svg
			className={classNames(styles.svg, styles.svgDialog)}
			viewBox="0 0 160 160"
			aria-hidden="true"
			focusable="false"
		>
			<rect
				y="51.5"
				width="160"
				height="69"
				rx="12"
				fill="var(--sapContent_Illustrative_Color20)"
			/>
			<path
				d="M119.164 93.8629L115.057 92.7208L99.2307 89.0574L86.7225 75.8224L76.9139 65.6143L27 81.3713L40.3375 85.022L37.8491 89.6282L68.7241 108L70.5212 100.733L89.5729 107.582L119.164 93.8629Z"
				fill="var(--sapContent_Illustrative_Color21)"
			/>
			<path
				d="M85.1572 54.2786L120.643 64.9334L119.539 93.2143L85.1572 78.2211V54.2786Z"
				fill="var(--sapContent_Illustrative_Color16)"
			/>
			<path
				d="M56.593 89.7643L85.1571 78.4404V54.2786L55.0928 62.1761L56.593 89.7643Z"
				fill="var(--sapContent_Illustrative_Color28)"
			/>
			<path
				d="M89.5928 75.6014L120.643 65.1213L119.536 93.7084L89.5928 107.507V75.6014Z"
				fill="var(--sapContent_Illustrative_Color28)"
			/>
			<path
				d="M96.126 40.4785L132.471 48.334L120.36 65.1214L85.1572 54.351L96.126 40.4785Z"
				fill="var(--sapContent_Illustrative_Color15)"
			/>
			<path
				d="M120.561 65.1213L132.964 79.5928L102.789 92.7213L89.5928 75.5371L120.561 65.1213Z"
				fill="var(--sapContent_Illustrative_Color3)"
			/>
			<path
				d="M85.1572 54.6551L78.8755 39L48.6857 45.1895L55.4997 62.6571L85.1572 54.6551Z"
				fill="var(--sapContent_Illustrative_Color3)"
			/>
			<path
				d="M56.5498 90.0973L89.5928 107.507V75.9262L55.0928 62.6572L56.5498 90.0973Z"
				fill="var(--sapContent_Illustrative_Color29)"
			/>
			<path
				d="M78.1568 96.6644L89.5929 75.731L55.2449 62.6572L44.7429 79.9981L78.1568 96.6644Z"
				fill="var(--sapContent_Illustrative_Color15)"
			/>
		</svg>
		<svg
			className={classNames(styles.svg, styles.svgScene)}
			viewBox="0 0 320 240"
			aria-hidden="true"
			focusable="false"
		>
			<rect
				y="58"
				width="320"
				height="138"
				rx="24"
				fill="var(--sapContent_Illustrative_Color20)"
			/>
			<path
				d="M240 155.316L231.665 152.999L199.555 145.566L174.176 118.712L154.275 98L53 129.971L80.0616 137.378L75.0126 146.724L137.658 184L141.304 169.255L179.96 183.153L240 155.316Z"
				fill="var(--sapContent_Illustrative_Color21)"
			/>
			<path
				d="M171 75L243 96.6186L240.76 154L171 123.579V75Z"
				fill="var(--sapContent_Illustrative_Color16)"
			/>
			<path
				d="M113.044 147L171 124.024V75L110 91.0239L113.044 147Z"
				fill="var(--sapContent_Illustrative_Color28)"
			/>
			<path
				d="M180 118.264L243 97L240.755 155.003L180 183V118.264Z"
				fill="var(--sapContent_Illustrative_Color28)"
			/>
			<path
				d="M193.256 47L267 62.9387L242.426 97L171 75.1471L193.256 47Z"
				fill="var(--sapContent_Illustrative_Color15)"
			/>
			<path
				d="M242.834 97L268 126.362L206.775 153L180 118.133L242.834 97Z"
				fill="var(--sapContent_Illustrative_Color3)"
			/>
			<path
				d="M171 75.7639L158.255 44L97 56.5585L110.826 92L171 75.7639Z"
				fill="var(--sapContent_Illustrative_Color3)"
			/>
			<path
				d="M112.956 147.676L180 183V118.923L110 92L112.956 147.676Z"
				fill="var(--sapContent_Illustrative_Color29)"
			/>
			<path
				d="M156.796 161L180 118.526L110.308 92L89 127.184L156.796 161Z"
				fill="var(--sapContent_Illustrative_Color15)"
			/>
		</svg>
	</Illustration>
);
