import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const PowerBIReport = () => {
  const containerStyle = {
    height: '541.25px',
    width: '1140px',
    border: '1px solid #ccc', // optional
  };

  return (
    <div style={containerStyle}>
      <PowerBIEmbed
        embedConfig={{
          type: 'report',
          id: '36b1a15c-756d-42c9-941e-fbea5a042f42',
          embedUrl: 'https://app.powerbi.com/groups/me/reports/36b1a15c-756d-42c9-941e-fbea5a042f42/992aac1a083480728678?experience=power-bi',
          //embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=36b1a15c-756d-42c9-941e-fbea5a042f42&autoAuth=true&ctid=3fce0782-7f02-430c-b2a5-e1792fff11bf',
          accessToken: '49ae3742-54c0-4c29-af52-619ff93b5c80eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmlsLnNoYXJtYUBoYW5zc3VwcG9ydC5jb20iLCJqdGkiOiI1NWUyMGFiOC01MjUzLTQ3MDItYjYwYy1lZDI5ODY2MmVmNWUiLCJleHAiOjE3NzE3NjY5OTYsImlzcyI6Ikp3dEF1dGhEZW1vIiwiYXVkIjoiSnd0QXV0aERlbW9Vc2VycyJ9.ffFCbGt0lIijCy9G8K3KDDKFuPrS-0YFULYCtgM_qDA',
          tokenType: models.TokenType.Aad,
          settings: {
            panes: { filters: { expanded: false, visible: true } },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={new Map([['loaded', () => console.log('Report loaded')]])}
        getEmbeddedComponent={(embeddedReport) => { window.report = embeddedReport; }}
      />
    </div>
  );
};

export default PowerBIReport;