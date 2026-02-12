import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AuctionTimer from "../components/AuctionTimer";
import MaskText from "../components/MaskText";
import { useWeb3 } from "../context/Web3Context";
import { DEMO_NFTS } from "../utils/constants";
import { formatAddress } from "../utils/helpers";
import "./NFTDetail.css";

const NFTDetail = () => {
  const { id } = useParams();
  const { account, connectWallet } = useWeb3();
  const [bidAmount, setBidAmount] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const nft = DEMO_NFTS.find((n) => n.id === parseInt(id)) || DEMO_NFTS[0];

  const bidHistory = [
    { bidder: "0xAb58...eC9B", amount: "2.10", time: "2 hours ago" },
    { bidder: "0x1234...5678", amount: "1.85", time: "5 hours ago" },
    { bidder: "0xabcd...abcd", amount: "1.50", time: "8 hours ago" },
    { bidder: "0x9876...5432", amount: "1.20", time: "12 hours ago" },
  ];

  const handleBuy = async () => {
    if (!account) {
      connectWallet();
      return;
    }
    alert("Purchase flow: connect to smart contract here");
  };

  const handleBid = async () => {
    if (!account) {
      connectWallet();
      return;
    }
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert("Enter a valid bid amount");
      return;
    }
    alert(`Bid of ${bidAmount} ETH placed! (connect to smart contract)`);
  };

  return (
    <div className="nft-detail container">
      <div className="nft-detail__layout">
        {/* Left - Image */}
        <motion.div
          className="nft-detail__image-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="nft-detail__image-card glass">
            <img src={nft.image} alt={nft.name} className="nft-detail__image" />
            <div className="nft-detail__image-glow" />
          </div>
        </motion.div>

        {/* Right - Info */}
        <motion.div
          className="nft-detail__info-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="nft-detail__collection">{nft.collection}</span>
          <MaskText text={nft.name} className="nft-detail__title" tag="h1" />

          <div className="nft-detail__meta">
            <div className="nft-detail__meta-item">
              <div className="nft-detail__avatar" />
              <div>
                <span className="nft-detail__meta-label">Creator</span>
                <span className="nft-detail__meta-value">{formatAddress(nft.creator)}</span>
              </div>
            </div>
            <div className="nft-detail__meta-item">
              <div className="nft-detail__avatar nft-detail__avatar--owner" />
              <div>
                <span className="nft-detail__meta-label">Owner</span>
                <span className="nft-detail__meta-value">{formatAddress(nft.owner)}</span>
              </div>
            </div>
          </div>

          {/* Price / Auction */}
          <div className="nft-detail__price-card glass">
            {nft.isAuction ? (
              <>
                <AuctionTimer endTime={nft.endTime} />
                <div className="nft-detail__price-row">
                  <div>
                    <span className="nft-detail__price-label">Current Bid</span>
                    <span className="nft-detail__price-value">
                      <span className="eth-icon">Ξ</span> {nft.highestBid} ETH
                    </span>
                  </div>
                </div>
                <div className="nft-detail__bid-input-wrapper glass">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter bid amount (ETH)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="nft-detail__bid-input"
                  />
                  <button className="nft-detail__btn nft-detail__btn--primary" onClick={handleBid}>
                    Place Bid 🔥
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="nft-detail__price-row">
                  <div>
                    <span className="nft-detail__price-label">Price</span>
                    <span className="nft-detail__price-value">
                      <span className="eth-icon">Ξ</span> {nft.price} ETH
                    </span>
                  </div>
                </div>
                <button className="nft-detail__btn nft-detail__btn--primary nft-detail__btn--full" onClick={handleBuy}>
                  {account ? "Buy Now" : "Connect Wallet to Buy"}
                </button>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="nft-detail__tabs">
            {["details", "bids", "history"].map((tab) => (
              <button
                key={tab}
                className={`nft-detail__tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="nft-detail__tab-content glass">
            {activeTab === "details" && (
              <div className="nft-detail__details">
                <div className="nft-detail__detail-row">
                  <span>Contract</span>
                  <span className="gradient-text">0x1234...5678</span>
                </div>
                <div className="nft-detail__detail-row">
                  <span>Token ID</span>
                  <span>#{nft.id}</span>
                </div>
                <div className="nft-detail__detail-row">
                  <span>Blockchain</span>
                  <span>Ethereum</span>
                </div>
                <div className="nft-detail__detail-row">
                  <span>Token Standard</span>
                  <span>ERC-721</span>
                </div>
                <div className="nft-detail__detail-row">
                  <span>Royalty</span>
                  <span>2.5%</span>
                </div>
              </div>
            )}

            {activeTab === "bids" && (
              <div className="nft-detail__bids">
                {bidHistory.map((bid, i) => (
                  <motion.div
                    key={i}
                    className="nft-detail__bid-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="nft-detail__bid-avatar" />
                    <div className="nft-detail__bid-info">
                      <span className="nft-detail__bid-address">{bid.bidder}</span>
                      <span className="nft-detail__bid-time">{bid.time}</span>
                    </div>
                    <span className="nft-detail__bid-amount gradient-text">
                      Ξ {bid.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "history" && (
              <div className="nft-detail__history">
                <div className="nft-detail__history-item">
                  <span>🎨</span> Minted by {formatAddress(nft.creator)}
                </div>
                <div className="nft-detail__history-item">
                  <span>📋</span> Listed for sale at Ξ {nft.price}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NFTDetail;