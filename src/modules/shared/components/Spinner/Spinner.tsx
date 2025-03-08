import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
	margin: 0 auto;

	width: 4rem;
	aspect-ratio: 1;
	border-radius: 50%;
	background:
		radial-gradient(farthest-side, #ed93ae 94%, #0000) top/10px 10px no-repeat,
		conic-gradient(#0000 30%, #ed93ae);
	-webkit-mask: radial-gradient(
		farthest-side,
		#0000 calc(100% - 10px),
		#ed93ae 0
	);
	animation: ${rotate} 1.5s infinite linear;
`;

// function Spinner() {
// 	return (
// 		<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
// 			<svg
// 				xmlns='http://www.w3.org/2000/svg'
// 				width={24}
// 				height={24}
// 				viewBox='0 0 24 24'
// 			>
// 				<ellipse cx={12} cy={5} fill='currentColor' rx={4} ry={4}>
// 					<animate
// 						id='svgSpinnersBouncingBall0'
// 						fill='freeze'
// 						attributeName='cy'
// 						begin='0;svgSpinnersBouncingBall2.end'
// 						calcMode='spline'
// 						dur='0.375s'
// 						keySplines='.33,0,.66,.33'
// 						values='5;20'
// 					></animate>
// 					<animate
// 						attributeName='rx'
// 						begin='svgSpinnersBouncingBall0.end'
// 						calcMode='spline'
// 						dur='0.05s'
// 						keySplines='.33,0,.66,.33;.33,.66,.66,1'
// 						values='4;4.8;4'
// 					></animate>
// 					<animate
// 						attributeName='ry'
// 						begin='svgSpinnersBouncingBall0.end'
// 						calcMode='spline'
// 						dur='0.05s'
// 						keySplines='.33,0,.66,.33;.33,.66,.66,1'
// 						values='4;3;4'
// 					></animate>
// 					<animate
// 						id='svgSpinnersBouncingBall1'
// 						attributeName='cy'
// 						begin='svgSpinnersBouncingBall0.end'
// 						calcMode='spline'
// 						dur='0.025s'
// 						keySplines='.33,0,.66,.33'
// 						values='20;20.5'
// 					></animate>
// 					<animate
// 						id='svgSpinnersBouncingBall2'
// 						attributeName='cy'
// 						begin='svgSpinnersBouncingBall1.end'
// 						calcMode='spline'
// 						dur='0.4s'
// 						keySplines='.33,.66,.66,1'
// 						values='20.5;5'
// 					></animate>
// 				</ellipse>
// 			</svg>
// 		</div>
// 	);
// }

export default Spinner;
