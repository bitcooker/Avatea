import * as React from "react";

import {uploadIcon} from "../../SVG";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {useEffect, DependencyList} from "react";
import Button from "../../core/Button/Button";
import DropFiles from "./DropFiles";


export default function ImageDropdown(props) {
    const [crop, setCrop] = React.useState("")
    const [imgSrc, setImgSrc] = React.useState("");
    const [final, setFinal] = React.useState(false);
    const previewCanvasRef = React.useRef(null)
    const imgRef = React.useRef(null)
    const [completedCrop, setCompletedCrop] = React.useState()


    async function canvasPreview(
        image,
        canvas,
        crop,
        scale = 1,
        rotate = 0,
    ) {
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            throw new Error('No 2d context')
        }

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        // devicePixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to
        // size the image back down if you want to download/upload and be
        // true to the images natural size.
        const pixelRatio = window.devicePixelRatio
        // const pixelRatio = 1

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = 'high'

        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY

        const rotateRads = rotate * Math.PI / 180
        const centerX = image.naturalWidth / 2
        const centerY = image.naturalHeight / 2

        ctx.save()

        // 5) Move the crop origin to the canvas origin (0,0)
        ctx.translate(-cropX, -cropY)
        // 4) Move the origin to the center of the original position
        ctx.translate(centerX, centerY)
        // 3) Rotate around the origin
        ctx.rotate(rotateRads)
        // 2) Scale the image
        ctx.scale(scale, scale)
        // 1) Move the center of the image to the origin (0,0)
        ctx.translate(-centerX, -centerY)
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        )

        ctx.restore()
    }

    function onSelectFile(image) {

        setCrop(undefined) // Makes crop preview update between images.
        setFinal(false)
        const reader = new FileReader()
        reader.addEventListener('load', () =>
            setImgSrc(reader.result.toString() || ''),
        )
        reader.readAsDataURL(image)

    }

    function onImageLoad(e) {
        const {width, height} = e.currentTarget
        setCrop(centerAspectCrop(width, height, props.aspectRatio))
    }


    function centerAspectCrop(
        mediaWidth,
        mediaHeight,
        aspect,
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    function handleToggleAspectClick() {
        const {width, height} = imgRef.current
        setAspect(props.aspectRatio)
        setCrop(centerAspectCrop(width, height, props.aspectRatio))
    }

    useEffect(() => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    1,
                    0,
                )
            }
        },
        // 100,
        [completedCrop],
    )

    return (
        <div>

            <div className="flex flex-col space-y-3.75">
                <h1 className="text-xl">{props.label}</h1>
                <div
                    className="flex flex-col h-auto p-7.5 items-center border-2 border-dashed border-indigo-500/40 rounded-2.5xl space-y-12.5 hover:cursor-pointer hover:border-solid">
                    {uploadIcon}
                    <div className="text-base">
                        Drop files here or <span className="text-indigo-500">Browse</span>
                    </div>
                </div>
            </div>

            <DropFiles setValue={onSelectFile}/>

            {/*<div className="Crop-Controls">*/}
            {/*    <input type="file" accept="image/*" onChange={onSelectFile}/>*/}
            {/*</div>*/}

            {(!final && Boolean(imgSrc)) && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={props.aspectRatio}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{transform: `scale(1) rotate(0deg)`}}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {(!final && Boolean(imgSrc)) &&
                <Button
                    name="Save"
                    handleClick={() => setFinal(true)}
                />
            }
            <div>
                {Boolean(completedCrop) && (
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: final ? '1px solid black' : '0px',
                            objectFit: 'contain',
                            width: final ? completedCrop.width : 0,
                            height: final ? completedCrop.height : 0,
                        }}
                    />
                )}
            </div>
        </div>
    )
}
