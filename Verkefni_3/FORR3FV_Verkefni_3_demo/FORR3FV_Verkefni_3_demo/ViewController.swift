//
//  ViewController.swift
//  FORR3FV_Verkefni_3_demo
//
//  Created by Pétur Steinn on 28/02/2019.
//  Copyright © 2019 Pétur Steinn. All rights reserved.
//

import UIKit
import SceneKit
import ARKit

class ViewController: UIViewController, ARSCNViewDelegate {
    
    @IBOutlet var sceneView: ARSCNView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set the view's delegate
        sceneView.delegate = self
        
        // Create a new scene
        let scene = SCNScene(named: "art.scnassets/GameScene.scn")!
        
        // Set the scene to the view
        sceneView.scene = scene
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        // Stilla session configuration, forritið stillt til þess að tracka myndir
        let configuration = ARImageTrackingConfiguration()

        // Leitað er af myndum í "Photos" og setja í trackedImages settið
        guard let trackedImages = ARReferenceImage.referenceImages(inGroupNamed: "Photos", bundle: Bundle.main) else {
            print("No images available")
            return
        }

        // Tracka myndirnar úr trackedImages settinu (aðeins er um eina mynd að ræða svo búið er að limita myndir að einni mynd)
        configuration.trackingImages = trackedImages
        configuration.maximumNumberOfTrackedImages = 1
        
        // Run the view's session
        sceneView.session.run(configuration)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        // Pause the view's session
        sceneView.session.pause()
    }
    
    // MARK: - ARSCNViewDelegate
    
    // Fallið keyrir í hvert sinn sem nýr ancor er bætt við í scene
    
    func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
        
        let node = SCNNode()
        
        // Búa til flatann grunn sem er jafn stór og myndin á skjánnum
        if let imageAnchor = anchor as? ARImageAnchor {
            let plane = SCNPlane(width: imageAnchor.referenceImage.physicalSize.width, height: imageAnchor.referenceImage.physicalSize.height)
            
            // Gera grunninn hvítann og 20% gegnsæann
            plane.firstMaterial?.diffuse.contents = UIColor(white: 1, alpha: 0.8)
            
            // Búa til nodeið og snúa því á hlið
            let planeNode = SCNNode(geometry: plane)
            planeNode.eulerAngles.x = -.pi / 2
            
            // Ná í model sceneið
            let shipScene = SCNScene(named: "art.scnassets/ship.scn")!
            let shipNode = shipScene.rootNode.childNodes.first!
            shipNode.position = SCNVector3Zero
            shipNode.position.z = 0.15
            
            // Bæta geimflauginni við grunninn
            planeNode.addChildNode(shipNode)
            
            // Bæta grunninum við myndina sem verið er að tracka
            node.addChildNode(planeNode)
            
        }
        
        return node
        
    }
    
    
}
