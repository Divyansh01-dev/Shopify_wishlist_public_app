import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  
  // Mock settings data
  const settingsData = {
    basics: {
      colors: {
        primary: '#2C5AA0',
        secondary: '#FF6B35',
        accent: '#4ECDC4',
        background: '#FFFFFF',
        text: '#2D3748'
      },
      icons: {
        wishlist: 'heart',
        cart: 'shopping-cart',
        user: 'user'
      }
    },
    productPage: {
      buttonPosition: 'below-price',
      buttonStyle: 'primary',
      showIcon: true,
      buttonText: 'Add to Wishlist'
    },
    collection: {
      showWishlistButton: true,
      buttonPosition: 'top-right',
      quickView: false
    },
    wishlistPage: {
      layout: 'grid',
      itemsPerPage: 12,
      showPrices: true,
      showStock: true,
      socialSharing: true
    }
  };

  return { settings: settingsData };
};

type TabType = 'basics' | 'product-page' | 'collection' | 'wishlist-page';

export default function WishlistSettings() {
  const { settings } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<TabType>('basics');
  
  // State for settings
  const [colorSettings, setColorSettings] = useState(settings.basics.colors);
  const [iconSettings, setIconSettings] = useState(settings.basics.icons);
  const [productPageSettings, setProductPageSettings] = useState(settings.productPage);
  const [collectionSettings, setCollectionSettings] = useState(settings.collection);
  const [wishlistPageSettings, setWishlistPageSettings] = useState(settings.wishlistPage);

  const tabs = [
    { id: 'basics' as TabType, label: 'Basics', icon: '🎨' },
    { id: 'product-page' as TabType, label: 'Product Page', icon: '🛒' },
    { id: 'collection' as TabType, label: 'Collection', icon: '📦' },
    { id: 'wishlist-page' as TabType, label: 'Wishlist Page', icon: '❤️' },
  ];

  const handleColorChange = (colorType: string, value: string) => {
    setColorSettings(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const handleIconChange = (iconType: string, value: string) => {
    setIconSettings(prev => ({
      ...prev,
      [iconType]: value
    }));
  };

  const handleProductPageSettingChange = (setting: string, value: any) => {
    setProductPageSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleCollectionSettingChange = (setting: string, value: any) => {
    setCollectionSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleWishlistPageSettingChange = (setting: string, value: any) => {
    setWishlistPageSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basics':
        return (
          <s-section heading="Basic Settings">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left Side - Settings */}
              <s-stack direction="block" gap="loose">
                <s-section heading="Color Settings">
                  <s-stack direction="block" gap="base">
                    <div>
                      <s-label>Primary Color</s-label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <input
                          type="color"
                          value={colorSettings.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          style={{ width: '50px', height: '40px', cursor: 'pointer' }}
                        />
                        <s-text>{colorSettings.primary}</s-text>
                      </div>
                    </div>
                    
                    <div>
                      <s-label>Secondary Color</s-label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <input
                          type="color"
                          value={colorSettings.secondary}
                          onChange={(e) => handleColorChange('secondary', e.target.value)}
                          style={{ width: '50px', height: '40px', cursor: 'pointer' }}
                        />
                        <s-text>{colorSettings.secondary}</s-text>
                      </div>
                    </div>
                    
                    <div>
                      <s-label>Accent Color</s-label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <input
                          type="color"
                          value={colorSettings.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          style={{ width: '50px', height: '40px', cursor: 'pointer' }}
                        />
                        <s-text>{colorSettings.accent}</s-text>
                      </div>
                    </div>
                  </s-stack>
                </s-section>

                <s-section heading="Icon Settings">
                  <s-stack direction="block" gap="base">
                    <div>
                      <s-label>Wishlist Icon</s-label>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        {['heart', 'star', 'bookmark', 'like'].map(icon => (
                          <button
                            key={icon}
                            onClick={() => handleIconChange('wishlist', icon)}
                            style={{
                              padding: '12px',
                              border: `2px solid ${iconSettings.wishlist === icon ? colorSettings.primary : '#e1e1e1'}`,
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              fontSize: '20px'
                            }}
                          >
                            {icon === 'heart' && '❤️'}
                            {icon === 'star' && '⭐'}
                            {icon === 'bookmark' && '📌'}
                            {icon === 'like' && '👍'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <s-label>Cart Icon</s-label>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        {['shopping-cart', 'basket', 'bag'].map(icon => (
                          <button
                            key={icon}
                            onClick={() => handleIconChange('cart', icon)}
                            style={{
                              padding: '12px',
                              border: `2px solid ${iconSettings.cart === icon ? colorSettings.primary : '#e1e1e1'}`,
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              fontSize: '20px'
                            }}
                          >
                            {icon === 'shopping-cart' && '🛒'}
                            {icon === 'basket' && '🧺'}
                            {icon === 'bag' && '🛍️'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </s-stack>
                </s-section>
              </s-stack>

              {/* Right Side - Preview */}
              <s-section heading="Preview">
                <div style={{ 
                  padding: '24px', 
                  border: '1px solid #e1e1e1', 
                  borderRadius: '12px',
                  backgroundColor: colorSettings.background
                }}>
                  <s-stack direction="block" gap="loose">
                    {/* Product Card Preview */}
                    <div style={{
                      border: '1px solid #e1e1e1',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: 'white'
                    }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span>📱</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <s-text style={{ 
                            color: colorSettings.text,
                            fontWeight: 'bold',
                            marginBottom: '4px'
                          }}>
                            Sample Product
                          </s-text>
                          <s-text style={{ 
                            color: colorSettings.primary,
                            fontWeight: 'bold',
                            marginBottom: '8px'
                          }}>
                            $99.99
                          </s-text>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{
                              padding: '8px 16px',
                              backgroundColor: colorSettings.primary,
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}>
                              Add to Cart
                            </button>
                            <button style={{
                              padding: '8px 12px',
                              backgroundColor: 'transparent',
                              color: colorSettings.secondary,
                              border: `1px solid ${colorSettings.secondary}`,
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}>
                              {iconSettings.wishlist === 'heart' && '❤️'}
                              {iconSettings.wishlist === 'star' && '⭐'}
                              {iconSettings.wishlist === 'bookmark' && '📌'}
                              {iconSettings.wishlist === 'like' && '👍'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Color Palette Preview */}
                    <div>
                      <s-text style={{ marginBottom: '12px', display: 'block' }}>Color Palette:</s-text>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {Object.entries(colorSettings).map(([key, color]) => (
                          <div key={key} style={{ textAlign: 'center' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: color,
                              border: '1px solid #e1e1e1',
                              borderRadius: '4px'
                            }}></div>
                            <s-text size="small" style={{ display: 'block', marginTop: '4px' }}>
                              {key}
                            </s-text>
                          </div>
                        ))}
                      </div>
                    </div>
                  </s-stack>
                </div>
              </s-section>
            </div>
          </s-section>
        );

      case 'product-page':
        return (
          <s-section heading="Product Page Button Settings">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left Side - Settings */}
              <s-stack direction="block" gap="loose">
                <s-section heading="Button Position">
                  <s-stack direction="block" gap="base">
                    {[
                      { value: 'below-price', label: 'Below Price', description: 'Button appears below the product price' },
                      { value: 'add-to-cart', label: 'Next to Add to Cart', description: 'Button appears beside the add to cart button' },
                      { value: 'image-top', label: 'Top of Image', description: 'Button appears at the top right of product image' },
                      { value: 'description', label: 'After Description', description: 'Button appears after product description' }
                    ].map(position => (
                      <label key={position.value} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', border: '1px solid #e1e1e1', borderRadius: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="buttonPosition"
                          value={position.value}
                          checked={productPageSettings.buttonPosition === position.value}
                          onChange={(e) => handleProductPageSettingChange('buttonPosition', e.target.value)}
                        />
                        <div>
                          <s-text style={{ fontWeight: 'bold' }}>{position.label}</s-text>
                          <s-text size="small" style={{ color: '#666' }}>{position.description}</s-text>
                        </div>
                      </label>
                    ))}
                  </s-stack>
                </s-section>

                <s-section heading="Button Style">
                  <s-stack direction="inline" gap="base">
                    {[
                      { value: 'primary', label: 'Primary', style: { backgroundColor: colorSettings.primary, color: 'white' } },
                      { value: 'secondary', label: 'Secondary', style: { backgroundColor: colorSettings.secondary, color: 'white' } },
                      { value: 'outline', label: 'Outline', style: { backgroundColor: 'transparent', border: `2px solid ${colorSettings.primary}`, color: colorSettings.primary } }
                    ].map(style => (
                      <button
                        key={style.value}
                        onClick={() => handleProductPageSettingChange('buttonStyle', style.value)}
                        style={{
                          padding: '12px 20px',
                          border: `2px solid ${productPageSettings.buttonStyle === style.value ? colorSettings.accent : 'transparent'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          ...style.style
                        }}
                      >
                        {style.label}
                      </button>
                    ))}
                  </s-stack>
                </s-section>

                <s-section heading="Button Options">
                  <s-stack direction="block" gap="base">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={productPageSettings.showIcon}
                        onChange={(e) => handleProductPageSettingChange('showIcon', e.target.checked)}
                      />
                      <s-text>Show icon on button</s-text>
                    </label>
                    
                    <div>
                      <s-label>Button Text</s-label>
                      <input
                        type="text"
                        value={productPageSettings.buttonText}
                        onChange={(e) => handleProductPageSettingChange('buttonText', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '8px 12px', 
                          border: '1px solid #e1e1e1', 
                          borderRadius: '4px',
                          marginTop: '8px'
                        }}
                      />
                    </div>
                  </s-stack>
                </s-section>
              </s-stack>

              {/* Right Side - Preview */}
              <s-section heading="Preview">
                <div style={{ 
                  padding: '24px', 
                  border: '1px solid #e1e1e1', 
                  borderRadius: '12px',
                  backgroundColor: 'white'
                }}>
                  {/* Product Page Preview */}
                  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    {/* Product Image */}
                    <div style={{
                      height: '200px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <span style={{ fontSize: '48px' }}>📱</span>
                      {productPageSettings.buttonPosition === 'image-top' && (
                        <button style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '8px',
                          backgroundColor: 'white',
                          border: '1px solid #e1e1e1',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>
                          {productPageSettings.showIcon && '❤️'}
                        </button>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <s-stack direction="block" gap="base">
                      <s-heading>Smartphone X</s-heading>
                      <s-text style={{ color: colorSettings.primary, fontWeight: 'bold', fontSize: '24px' }}>
                        $599.99
                      </s-text>
                      
                      {productPageSettings.buttonPosition === 'below-price' && (
                        <button style={{
                          padding: '12px 24px',
                          backgroundColor: productPageSettings.buttonStyle === 'primary' ? colorSettings.primary : 
                                         productPageSettings.buttonStyle === 'secondary' ? colorSettings.secondary : 'transparent',
                          border: productPageSettings.buttonStyle === 'outline' ? `2px solid ${colorSettings.primary}` : 'none',
                          color: productPageSettings.buttonStyle === 'outline' ? colorSettings.primary : 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          justifyContent: 'center'
                        }}>
                          {productPageSettings.showIcon && '❤️'}
                          {productPageSettings.buttonText}
                        </button>
                      )}
                      
                      <s-text>
                        High-performance smartphone with advanced camera and long-lasting battery.
                      </s-text>
                      
                      {productPageSettings.buttonPosition === 'add-to-cart' && (
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button style={{
                            padding: '12px 24px',
                            backgroundColor: colorSettings.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            flex: 1
                          }}>
                            Add to Cart
                          </button>
                          <button style={{
                            padding: '12px 24px',
                            backgroundColor: productPageSettings.buttonStyle === 'primary' ? colorSettings.primary : 
                                           productPageSettings.buttonStyle === 'secondary' ? colorSettings.secondary : 'transparent',
                            border: productPageSettings.buttonStyle === 'outline' ? `2px solid ${colorSettings.primary}` : 'none',
                            color: productPageSettings.buttonStyle === 'outline' ? colorSettings.primary : 'white',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flex: 1
                          }}>
                            {productPageSettings.showIcon && '❤️'}
                            {productPageSettings.buttonText}
                          </button>
                        </div>
                      )}
                      
                      {productPageSettings.buttonPosition === 'description' && (
                        <button style={{
                          padding: '12px 24px',
                          backgroundColor: productPageSettings.buttonStyle === 'primary' ? colorSettings.primary : 
                                         productPageSettings.buttonStyle === 'secondary' ? colorSettings.secondary : 'transparent',
                          border: productPageSettings.buttonStyle === 'outline' ? `2px solid ${colorSettings.primary}` : 'none',
                          color: productPageSettings.buttonStyle === 'outline' ? colorSettings.primary : 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          justifyContent: 'center'
                        }}>
                          {productPageSettings.showIcon && '❤️'}
                          {productPageSettings.buttonText}
                        </button>
                      )}
                    </s-stack>
                  </div>
                </div>
              </s-section>
            </div>
          </s-section>
        );

      case 'collection':
        return (
          <s-section heading="Collection Page Settings">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left Side - Settings */}
              <s-stack direction="block" gap="loose">
                <s-section heading="Wishlist Button on Collection Pages">
                  <s-stack direction="block" gap="base">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={collectionSettings.showWishlistButton}
                        onChange={(e) => handleCollectionSettingChange('showWishlistButton', e.target.checked)}
                      />
                      <s-text>Show wishlist button on collection pages</s-text>
                    </label>
                  </s-stack>
                </s-section>

                {collectionSettings.showWishlistButton && (
                  <>
                    <s-section heading="Button Position">
                      <s-stack direction="block" gap="base">
                        {[
                          { value: 'top-right', label: 'Top Right', description: 'Button appears at the top right corner of product card' },
                          { value: 'bottom-right', label: 'Bottom Right', description: 'Button appears at the bottom right corner' },
                          { value: 'above-image', label: 'Above Image', description: 'Button appears above the product image' },
                          { value: 'on-hover', label: 'On Hover', description: 'Button appears when hovering over product card' }
                        ].map(position => (
                          <label key={position.value} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', border: '1px solid #e1e1e1', borderRadius: '8px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="collectionButtonPosition"
                              value={position.value}
                              checked={collectionSettings.buttonPosition === position.value}
                              onChange={(e) => handleCollectionSettingChange('buttonPosition', e.target.value)}
                            />
                            <div>
                              <s-text style={{ fontWeight: 'bold' }}>{position.label}</s-text>
                              <s-text size="small" style={{ color: '#666' }}>{position.description}</s-text>
                            </div>
                          </label>
                        ))}
                      </s-stack>
                    </s-section>

                    <s-section heading="Additional Options">
                      <s-stack direction="block" gap="base">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={collectionSettings.quickView}
                            onChange={(e) => handleCollectionSettingChange('quickView', e.target.checked)}
                          />
                          <s-text>Enable quick view on collection pages</s-text>
                        </label>
                      </s-stack>
                    </s-section>
                  </>
                )}
              </s-stack>

              {/* Right Side - Preview */}
              <s-section heading="Preview">
                <div style={{ 
                  padding: '24px', 
                  border: '1px solid #e1e1e1', 
                  borderRadius: '12px',
                  backgroundColor: 'white'
                }}>
                  <s-text style={{ marginBottom: '16px', display: 'block' }}>Collection Grid Preview:</s-text>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Product Card 1 */}
                    <div style={{
                      border: '1px solid #e1e1e1',
                      borderRadius: '8px',
                      padding: '12px',
                      position: 'relative',
                      backgroundColor: 'white'
                    }}>
                      {(collectionSettings.buttonPosition === 'top-right' || collectionSettings.buttonPosition === 'above-image') && collectionSettings.showWishlistButton && (
                        <button style={{
                          position: 'absolute',
                          top: collectionSettings.buttonPosition === 'top-right' ? '8px' : '-10px',
                          right: collectionSettings.buttonPosition === 'top-right' ? '8px' : '8px',
                          padding: '6px',
                          backgroundColor: 'white',
                          border: '1px solid #e1e1e1',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          zIndex: 1
                        }}>
                          ❤️
                        </button>
                      )}
                      
                      <div style={{
                        height: '120px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '32px' }}>👕</span>
                      </div>
                      
                      <s-text style={{ fontWeight: 'bold', marginBottom: '4px' }}>T-Shirt</s-text>
                      <s-text style={{ color: colorSettings.primary, fontWeight: 'bold' }}>$29.99</s-text>
                      
                      {collectionSettings.buttonPosition === 'bottom-right' && collectionSettings.showWishlistButton && (
                        <button style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          padding: '6px',
                          backgroundColor: 'white',
                          border: '1px solid #e1e1e1',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>
                          ❤️
                        </button>
                      )}
                    </div>

                    {/* Product Card 2 */}
                    <div style={{
                      border: '1px solid #e1e1e1',
                      borderRadius: '8px',
                      padding: '12px',
                      position: 'relative',
                      backgroundColor: 'white'
                    }}>
                      {(collectionSettings.buttonPosition === 'top-right' || collectionSettings.buttonPosition === 'above-image') && collectionSettings.showWishlistButton && (
                        <button style={{
                          position: 'absolute',
                          top: collectionSettings.buttonPosition === 'top-right' ? '8px' : '-10px',
                          right: collectionSettings.buttonPosition === 'top-right' ? '8px' : '8px',
                          padding: '6px',
                          backgroundColor: 'white',
                          border: '1px solid #e1e1e1',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          zIndex: 1
                        }}>
                          ❤️
                        </button>
                      )}
                      
                      <div style={{
                        height: '120px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '32px' }}>👖</span>
                      </div>
                      
                      <s-text style={{ fontWeight: 'bold', marginBottom: '4px' }}>Jeans</s-text>
                      <s-text style={{ color: colorSettings.primary, fontWeight: 'bold' }}>$49.99</s-text>
                      
                      {collectionSettings.buttonPosition === 'bottom-right' && collectionSettings.showWishlistButton && (
                        <button style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          padding: '6px',
                          backgroundColor: 'white',
                          border: '1px solid #e1e1e1',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>
                          ❤️
                        </button>
                      )}
                    </div>
                  </div>

                  {collectionSettings.buttonPosition === 'on-hover' && collectionSettings.showWishlistButton && (
                    <s-text style={{ marginTop: '16px', display: 'block', color: '#666', fontStyle: 'italic' }}>
                      Note: On hover effect cannot be previewed in static view
                    </s-text>
                  )}
                </div>
              </s-section>
            </div>
          </s-section>
        );

      case 'wishlist-page':
        return (
          <s-section heading="Wishlist Page Settings">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left Side - Settings */}
              <s-stack direction="block" gap="loose">
                <s-section heading="Layout & Display">
                  <s-stack direction="block" gap="base">
                    <div>
                      <s-label>Layout Type</s-label>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        {[
                          { value: 'grid', label: 'Grid', icon: '⏹️' },
                          { value: 'list', label: 'List', icon: '📋' }
                        ].map(layout => (
                          <button
                            key={layout.value}
                            onClick={() => handleWishlistPageSettingChange('layout', layout.value)}
                            style={{
                              padding: '12px 20px',
                              border: `2px solid ${wishlistPageSettings.layout === layout.value ? colorSettings.primary : '#e1e1e1'}`,
                              borderRadius: '6px',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            <span>{layout.icon}</span>
                            {layout.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <s-label>Items Per Page</s-label>
                      <select
                        value={wishlistPageSettings.itemsPerPage}
                        onChange={(e) => handleWishlistPageSettingChange('itemsPerPage', parseInt(e.target.value))}
                        style={{ 
                          width: '100%', 
                          padding: '8px 12px', 
                          border: '1px solid #e1e1e1', 
                          borderRadius: '4px',
                          marginTop: '8px'
                        }}
                      >
                        {[6, 12, 24, 48].map(count => (
                          <option key={count} value={count}>
                            {count} items
                          </option>
                        ))}
                      </select>
                    </div>
                  </s-stack>
                </s-section>

                <s-section heading="Product Information">
                  <s-stack direction="block" gap="base">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={wishlistPageSettings.showPrices}
                        onChange={(e) => handleWishlistPageSettingChange('showPrices', e.target.checked)}
                      />
                      <s-text>Show product prices</s-text>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={wishlistPageSettings.showStock}
                        onChange={(e) => handleWishlistPageSettingChange('showStock', e.target.checked)}
                      />
                      <s-text>Show stock status</s-text>
                    </label>
                  </s-stack>
                </s-section>

                <s-section heading="Social Features">
                  <s-stack direction="block" gap="base">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={wishlistPageSettings.socialSharing}
                        onChange={(e) => handleWishlistPageSettingChange('socialSharing', e.target.checked)}
                      />
                      <s-text>Enable social sharing</s-text>
                    </label>
                  </s-stack>
                </s-section>
              </s-stack>

              {/* Right Side - Preview */}
              <s-section heading="Preview">
                <div style={{ 
                  padding: '24px', 
                  border: '1px solid #e1e1e1', 
                  borderRadius: '12px',
                  backgroundColor: 'white'
                }}>
                  <s-text style={{ marginBottom: '16px', display: 'block' }}>Wishlist Page Preview ({wishlistPageSettings.layout} layout):</s-text>
                  
                  {wishlistPageSettings.layout === 'grid' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {/* Wishlist Item 1 */}
                      <div style={{
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        padding: '12px',
                        backgroundColor: 'white'
                      }}>
                        <div style={{
                          height: '100px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: '24px' }}>📚</span>
                        </div>
                        
                        <s-text style={{ fontWeight: 'bold', marginBottom: '4px' }}>Book</s-text>
                        
                        {wishlistPageSettings.showPrices && (
                          <s-text style={{ color: colorSettings.primary, fontWeight: 'bold', marginBottom: '4px' }}>
                            $19.99
                          </s-text>
                        )}
                        
                        {wishlistPageSettings.showStock && (
                          <s-badge style={{ backgroundColor: '#4CAF50', color: 'white' }}>In Stock</s-badge>
                        )}
                      </div>

                      {/* Wishlist Item 2 */}
                      <div style={{
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        padding: '12px',
                        backgroundColor: 'white'
                      }}>
                        <div style={{
                          height: '100px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: '24px' }}>🎧</span>
                        </div>
                        
                        <s-text style={{ fontWeight: 'bold', marginBottom: '4px' }}>Headphones</s-text>
                        
                        {wishlistPageSettings.showPrices && (
                          <s-text style={{ color: colorSettings.primary, fontWeight: 'bold', marginBottom: '4px' }}>
                            $89.99
                          </s-text>
                        )}
                        
                        {wishlistPageSettings.showStock && (
                          <s-badge style={{ backgroundColor: '#FF6B35', color: 'white' }}>Low Stock</s-badge>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* List Layout */
                    <s-stack direction="block" gap="base">
                      {/* Wishlist Item 1 */}
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        padding: '12px',
                        backgroundColor: 'white'
                      }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: '20px' }}>📚</span>
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <s-text style={{ fontWeight: 'bold', marginBottom: '4px' }}>Book</s-text>
                          
                          {wishlistPageSettings.showPrices && (
                            <s-text style={{ color: colorSettings.primary, fontWeight: 'bold', marginBottom: '4px' }}>
                              $19.99
                            </s-text>
                          )}
                          
                          {wishlistPageSettings.showStock && (
                            <s-badge style={{ backgroundColor: '#4CAF50', color: 'white' }}>In Stock</s-badge>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button style={{
                            padding: '8px 12px',
                            backgroundColor: colorSettings.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            Add to Cart
                          </button>
                          <button style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: '1px solid #e1e1e1',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            ❌
                          </button>
                        </div>
                      </div>

                      {/* Wishlist Item 2 */}
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        padding: '12px',
                        backgroundColor: 'white'
                      }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: '20px' }}>🎧</span>
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <s-text style={{ fontWeight: 'bold', marginBottom: '4px' }}>Headphones</s-text>
                          
                          {wishlistPageSettings.showPrices && (
                            <s-text style={{ color: colorSettings.primary, fontWeight: 'bold', marginBottom: '4px' }}>
                              $89.99
                            </s-text>
                          )}
                          
                          {wishlistPageSettings.showStock && (
                            <s-badge style={{ backgroundColor: '#FF6B35', color: 'white' }}>Low Stock</s-badge>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button style={{
                            padding: '8px 12px',
                            backgroundColor: colorSettings.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            Add to Cart
                          </button>
                          <button style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: '1px solid #e1e1e1',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}>
                            ❌
                          </button>
                        </div>
                      </div>
                    </s-stack>
                  )}

                  {wishlistPageSettings.socialSharing && (
                    <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                      <s-text style={{ marginBottom: '8px', display: 'block' }}>Share your wishlist:</s-text>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '8px', border: '1px solid #e1e1e1', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>📘</button>
                        <button style={{ padding: '8px', border: '1px solid #e1e1e1', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>📱</button>
                        <button style={{ padding: '8px', border: '1px solid #e1e1e1', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>✉️</button>
                      </div>
                    </div>
                  )}
                </div>
              </s-section>
            </div>
          </s-section>
        );

      default:
        return null;
    }
  };

  return (
    <s-page heading="Wishlist Settings">
      {/* Tab Navigation */}
      <s-section>
        <div style={{ borderBottom: "1px solid #e1e1e1", marginBottom: "24px" }}>
          <s-stack direction="inline" gap="none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "12px 24px",
                  border: "none",
                  backgroundColor: activeTab === tab.id ? "#202223" : "transparent",
                  color: activeTab === tab.id ? "white" : "#202223",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  borderBottom: activeTab === tab.id ? "2px solid #202223" : "2px solid transparent",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = "#f6f6f7";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </s-stack>
        </div>
      </s-section>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Save Button */}
      <s-section>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: colorSettings.primary,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Save Settings
          </button>
        </div>
      </s-section>
    </s-page>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};