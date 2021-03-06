/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import Head from 'next/head'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {useState, Fragment} from 'react';
import {useWeb3React} from "../lib/web3wallet/core";
import {ConnectModal, getImperativeModal} from "../lib/ConnectModal";
import {curveAbi, getMintPrice, useMintPrice} from "../lib/useMintPrice";
import {Layout, Padding} from "../lib/Layout";
import {useCurveContract} from "../lib/useCurveContract";
import {useRouter} from "next/router";

export default function Home() {
  return (
    <Layout>
      <Hero />

      <Gallery />

      <SaleArea />
      <Mechanics />
      <ArtistStatement />
      <TechStack />
    </Layout>
  )
}


function Hero() {
  return <Padding css={css`
    font-family: Varta, sans-serif;
    text-align: left;
    h1 {
      font-size: 40px;
      margin-top: 45px;
      margin-bottom: 5px;
      line-height: 1.1;
    }
    p {
      margin-top: 30px;
      font-size: 22px;
    }
    a {
      color: #f45e92;
      font-weight: bold;
    }
  `}
  >
    <h1>
      Crypto art that mirrors real world data. An exploration of emergent behavior, an
      autonomous performance on the Ethereum blockchain.
    </h1>
    <p>
      The 24 unique NFTs represent woman of every age and background. Just as 1 in 8 woman will develop invasive
      breast cancer over the course of their lives, so will a percentage of the NFTs face this diagnosis. When
      they do, the art work changes shape to represent this. <a href={"#mechanics"}>Learn more.</a>
    </p>
  </Padding>
}


function formatMintPrice(price) {
  if (price) {
    // div leaves 3 decimal places.
    return parseInt(price.div("1000000000000000")) / 1000;
  } else {
    return undefined;
  }
}

function SaleArea() {
  const { account } = useWeb3React();
  const [currentPrice, nextPrice] = useMintPrice();


  return <div css={css`
    font-family: Varta,sans-serif;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
    margin: 80px 0 0;
    padding: 20px 0 80px;
    
    background: #fafafa;
  `}>
    <Padding>
      <div css={css`
        text-align: center;
        h4 {
          font-size: 44px;
        }
      `}>
        <h4>
          1st Set: Starting 7th February
        </h4>
      </div>
      <div css={css`
         text-align: center;
         display: flex;
         flex-direction: row;
         align-items: flex-start;
         justify-content: center;
         > div {
            margin: 30px;
         }
         
         strong {
          font-weight: 300;
         }
         .number {
            font-size: 44px;
         }
         .detail {
            font-size: 0.9em;
         }
       `}>
         <div style={{flex: 1}}>
           <strong>Pieces Available</strong>
           <div className={"number"}>
             8/8
           </div>
         </div>
         <div style={{flex: 1}}>
           <strong>Current Price</strong>
           <div className={"number"}>
             Ξ {formatMintPrice(currentPrice)}
           </div>
           <div className={"detail"}>
             <Tippy placement={"bottom"} content={<span>
                Each sale increases the price of the next piece. If a piece remains unsold
                for a longer period, the price starts to slowly decay.
             </span>}>
               <span>
                Next Price: Ξ {formatMintPrice(nextPrice)} {" "} <img style={{width: 16}} src="https://img.icons8.com/metro/26/000000/info.png"/>
               </span>
             </Tippy>
           </div>
         </div>
         <div style={{flex: 1, textAlign: 'right'}}>
           <PurchaseButton />
           <div className={"detail"} style={{paddingTop: '15px', color: '#3a3a3a'}}>
             {account ? <span>Connected as {account.slice(0, 6)}.{" "}</span> : null}
             The next piece in the series will be minted for you.
           </div>
         </div>
      </div>
    </Padding>
  </div>
}

function ArtistStatement() {
  return <div css={css`
    h3 {
        font-size: 35px;
        font-weight: 900;
    }
    font-family: Varta, sans-serif;
    font-size: 18px;
    line-height: 1.6;
    font-weight: 300;
    padding: 100px;
    margin: 0 0 0;
    background: #fcf6f6;
  `}>
    <Padding css={css`
       box-shadow: 3px 3px 8px 2px #ccc;
       background: white;
       max-width: 800px;
       margin: 0 auto;
    `}>
      <h3>
        <img src={"/icons/brush.png"} style={{height: '1.3em', paddingRight: '10px'}} />
        Artist Statement
      </h3>
      <p>
        One day, when I was eleven years old, I came home from school to find my mom crying. At the time, no one
        explained to me what happened, and I only later learnt that the reason: my aunt got breast cancer.
        After going through chemotherapy, surgery and radiotherapy, she was able to defeat the cancer.
      </p>
      <p>
        Then twenty years later, in late 2019, my mom was diagnosed with breast cancer as well.
        As a woman from the next generation, I am at a high risk of getting this cancer myself.
        While that seems frightening, when I look back and contrast my mom's with my aunt's treatment,
        I can see a big improvement. We have come a long way.
      </p>
      <p>
        I dedicate this project to my mom and to all those who have fought, are fighting and are continuing
        the fight against breast cancer.
      </p>
      <p>
        2020 was a tough year for everyone, but I know from my mom's personal experience that this time is especially
        hard on people fighting cancer. In addition to their illness, patients have to deal with all kinds of Covid-induced limitations.
        With this project we want them to know they are not alone.
      </p>
    </Padding>
  </div>
}


function Mechanics() {
  return <div id={"mechanics"} css={css`
    font-family: Varta,sans-serif;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
    padding: 50px 0;
    
    h3 {
        margin-top: 0;
        margin-bottom: 50px;
        font-size: 35px;
        font-weight: 900;
        text-align: center;
        display: flex;
        justify-content: center;       
        align-items: center;       
    }
      h3:before, h3:after { 
        content: ""; 
        width: 200px;
        margin: 0 0.2em;
        border-bottom: 1px solid #000;
      } 
    
    .point {
      margin-bottom: 20px;
    }
    strong {
      font-weight: 700;
    }
  `}>
    <Padding>
      <div css={css`
        max-width: 800px;
        margin: 0 auto;
        
        .fact {
          display: grid;
          grid-template-columns: 220px auto;
          grid-template-rows: auto auto;
          align-items: center;
          margin: 20px 0;
        }
        
        .fact > .number {
          grid-column: 1;
          grid-row: 1;
          font-size: 44px;
          width: 200px;
          text-align: center;
        }
        
        .fact > .text {
          grid-column: 2;
          grid-row: 1;
          font-size: 23px;
        }
        
        .fact > .detail {
          grid-column: 2;
          grid-row: 2;
          color: #616161;
          font-size: 17px;
        }
      `}>
        <h3>Mechanics</h3>

        <div className={"fact"}>
          <div className={"number"}>
            24
          </div>
          <div className={"text"}>
            unique illustrations, minted as NFTs.
          </div>
          <div className={"detail"}>
            Only 24 pieces will exist. They will be released in multiple sets, over a period of approximately 1 month.
          </div>
        </div>

        <div className={"fact"}>
          <div className={"number"}>
            1 in 12
          </div>
          <div className={"text"}>
            women are diagnosed with breast cancer.
          </div>
          <div className={"detail"}>
            There is a 1/12 chance a token will be diagnosed and change state.
          </div>
        </div>

        <div className={"fact"}>
          <div className={"number"}>
            5% <small style={{fontSize: '0.7em', verticalAlign: 'middle', color: "gray"}}>/</small> 15%
          </div>
          <div className={"text"}>
            secondary market royalties, going to charity.
          </div>
          <div className={"detail"}>
            Royalties increase to 15% for tokens which are diagnosed.
          </div>
        </div>

        <div className={"fact"}>
          <div className={"number"}>
            5 years
          </div>
          <div className={"text"}>
            runtime of the project.
          </div>
          <div className={"detail"}>
            The tokens will exist forever, but the randomness generator will gradually wind down, making new diagnosis unlikely.
          </div>
        </div>
      </div>
    </Padding>
  </div>
}


function TechStack() {
  return <div css={css`
    font-family: Varta,sans-serif;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
    margin: 0 0 100px 0;
    background: #595551;
    color: white;
    padding: 100px 0;
    
    h3 {
        margin-top: 0;
        margin-bottom: 0.5em;
        font-size: 35px;
        font-weight: 900;
    }
    .detail {
      font-size: 0.9em;
      margin-bottom: 50px;
    }
    
    .point {
      margin-bottom: 20px;
    }
    strong {
      font-weight: 700;
    }
    a {
      text-decoration: underline;
      text-underline: deeppink;
    }
    
    .section {
      margin-top: 30px;
    }
    
    .sectionHeader {
      font-weight: 900;
      font-size: 1.2em;
      border-bottom: 1px solid;
    }
    
    code {
      font-size: 0.9em;
      background: #36363477;
      padding: 0.2em;
    }
  `}>
    <Padding>
      <h3>Technical Details</h3>
      <p className={"detail"}>
        <span>
          0x663378bfc54ad95005358392d1e35bd1265e9d12
        </span>
        {" "}&bull;{" "}
        <span>
          <a href="https://etherscan.com">Etherscan</a>
        </span>
        {" "}&bull;{" "}
        <span>
          <a href="https://etherscan.com">OpenSea</a>
        </span>
        {" "}&bull;{" "}
        <span>
          <a href="https://etherscan.com">Source Code</a>
        </span>
      </p>

      <div className={"section"}>
        <div className={"sectionHeader"}>Randomness</div>
        <p>
          Chainlink VRF provides the randomness to the contract. The randomness generator can be triggered by anyone,
          at any time, as follows:
        </p>
        <ol css={css`
           list-style: none;
           counter-reset: item;
           li {
             counter-increment: item;
             margin-top: 25px;
             margin-bottom: 25px;
             display: flex;
             flex-direction: row;
             
           }
           li:before {
            margin-right: 10px;
            margin-top: -10px;
            content: counter(item);
            width: 1em;
            height: 1em;
            padding: 0.2em;
            font-size: 2em;
            line-height: 1em;
            vertical-align: middle;
            text-align: center;
            display: inline-block;
           }
           
           .hint {
             font-size: .9em;
             margin-top: 0.5em;
             color: silver;
           }
        `}>
          <li>
            <div>
              <div>Fund the contract with 2 LINK.</div>
              <div className={"hint"}>
                Hint: Only fund the contract when you want to request randomness. Since anyone can call the contract
                as often as they want, it is easy to drain its balance.
              </div>
            </div>

          </li>
          <li>
            <div>
              <div>
                Call the <code>requestRoll()</code> function.
              </div>
              <div className={"hint"}>
                Wait roughly two minutes, then verify on-chain that Chainlink has provided a random number.
              </div>
            </div>
          </li>
          <li>
            <div>
              After a minute or two, call the <code>applyRoll()</code> function.
            </div>
          </li>
        </ol>
      </div>

      <div className={"section"}>
        <div className={"sectionHeader"}>Zora Protocol</div>
        <p>
          The contract implements the <a href={"https://zora.engineering/protocol/smart-contracts"}>Zora Protocol</a>,
          embedding within each token its own marketplace. Owners have the ability to sell their tokens on the
          built-in market, using any interface available in the future, but retain the ability to list their
          tokens on OpenSea and others.
        </p>
      </div>

      <div className={"section"}>
        <div className={"sectionHeader"}>On-Chain Content</div>
        <p>
          It is imperative that the media files represented by NFTs remain accessible. For this reason, all artwork
          is stored on the Ethereum blockchain as SVG code. Further, to improve their accessibility through the web,
          we also store them on <a href={"https://www.arweave.org/"}>Arweave</a>. Finally, the Zora protocol allows
          an owner to update their
        </p>
      </div>

      <div className={"section"}>
        <div className={"sectionHeader"}>Royalties</div>
        <p>
          There is currently no accepted standard for NFT royalties. Since since is a long-term project,
          we wanted to future-proof it as much as possible by implementing multiple of the royalty standards
          currently in use. Specifically, the contract exposes functions to implement these interfaces:
        </p>
        <ul>
          <li>EIP-2981</li>
          <li>Rarible</li>
          <li>Known Origin</li>
          <li>InfinityNFT</li>
        </ul>
        <p>
          We did not implement <a href={"https://github.com/ethereum/EIPs/issues/2571"}>ERC-2571</a>
          {" "} or <a href={"https://github.com/ethereum/EIPs/issues/2665"}>ERC-2665</a>. The former has the
          undesirable effect of disabling simple transfers, and the latter seems to lack traction.
        </p>
      </div>
    </Padding>
  </div>
}

function Gallery() {
  return  <div>
    <div>
      <style jsx>{`
        .image {
          width: 200px;
          height: 200px;
          background-color: burlywood;
          margin: 10px;
          margin-top: 50px;
        }
        
        display: flex;
        align-items: center;
        justify-content: center;
      `}</style>

      <div className={"image"}/>
      <div className={"image"}/>
      <div className={"image"}/>
    </div>
  </div>
}


function PurchaseButton() {
  const [busy, setBusy] = useState(false);
  const { library, active } = useWeb3React();
  const router = useRouter();
  const contract = useCurveContract();

  const doPurchase = async () => {
    const withSigner = contract.connect(library.getSigner());

    const [price] = await getMintPrice();
    let tx;

    try {
      tx = await withSigner.purchase({
        value: price
      })
    } catch(e) {
      console.log(e);
      return;
    }

    let receipt;
    try {
      receipt = await tx.wait();
    } catch(e) {
      console.error(e);
      alert("Purchase failed.")
      return;
    }
    
    router.push('/thanks');
  }

  const [askToConnect, modalProps] = getImperativeModal();

  const handleClick = async () => {
    setBusy(true)
    try {
      if (active) {
        await doPurchase();
      } else {
        if (await askToConnect()) {
          //await doPurchase();
        }
      }
    }
    finally {
      setBusy(false)
    }
  }

  return <Fragment>
    <ConnectModal {...modalProps} />
    <button
      disabled={busy}
      onClick={handleClick}
      css={css`
       width: 80%;
       background-color: #363634;
       color: white;
       border: 0;
       padding: 0.7em;
       border-radius: 2px;
       font-size: 18px;
      `}
    >
      {active ? "Purchase" : "Connect"}
      {busy ? "..." : null}
    </button>
  </Fragment>
}
